import './DonutChart.css'

// Donut chart em SVG puro (sem dependência externa) — cada segmento é um
// arco desenhado via stroke-dasharray/stroke-dashoffset sobre um círculo.
const DonutChart = ({ data, size = 150, thickness = 24, centerLabel = '' }) => {
    const total = data.reduce((soma, item) => soma + item.value, 0)
    const radius = (size - thickness) / 2
    const circumference = 2 * Math.PI * radius

    let acumulado = 0
    const segmentos = total === 0 ? [] : data.filter(item => item.value > 0).map(item => {
        const comprimento = (item.value / total) * circumference
        const offset = -acumulado
        acumulado += comprimento
        return { ...item, comprimento, offset }
    })

    const resumo = data.map(item => `${item.label}: ${item.value}`).join(', ')

    return (
        <div className="donut-chart">
            <div className="donut-chart-visual">
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    role="img"
                    aria-label={resumo || 'Sem dados'}
                >
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth={thickness}
                    />
                    {segmentos.map(seg => (
                        <circle
                            key={seg.label}
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke={seg.color}
                            strokeWidth={thickness}
                            strokeDasharray={`${seg.comprimento} ${circumference - seg.comprimento}`}
                            strokeDashoffset={seg.offset}
                            transform={`rotate(-90 ${size / 2} ${size / 2})`}
                            className="donut-chart-segment"
                        />
                    ))}
                </svg>
                <div className="donut-chart-center">
                    <span className="donut-chart-center-value">{total}</span>
                    {centerLabel && <span className="donut-chart-center-label">{centerLabel}</span>}
                </div>
            </div>
            <ul className="donut-chart-legend">
                {data.map(item => (
                    <li key={item.label}>
                        <span className="donut-chart-dot" style={{ background: item.color }} />
                        <span className="donut-chart-legend-label">{item.label}</span>
                        <strong>{item.value}</strong>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DonutChart
