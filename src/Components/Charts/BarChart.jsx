import './BarChart.css'

// Barras horizontais simples (sem dependência externa) — cada item vira uma
// linha com a barra preenchida proporcional ao maior valor do conjunto.
const BarChart = ({ data }) => {
    const max = Math.max(...data.map(item => item.value), 1)

    return (
        <ul className="bar-chart">
            {data.map(item => (
                <li key={item.label} className="bar-chart-row">
                    <span className="bar-chart-label" title={item.label}>{item.label}</span>
                    <div className="bar-chart-track">
                        <div
                            className="bar-chart-fill"
                            style={{ width: `${(item.value / max) * 100}%`, background: item.color }}
                        />
                    </div>
                    <span className="bar-chart-value">{item.value}</span>
                </li>
            ))}
        </ul>
    )
}

export default BarChart
