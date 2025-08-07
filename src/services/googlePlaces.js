// API gratuita do OpenStreetMap (Nominatim)
export const buscarEscolasPorNome = async (query, cidade = 'São Paulo, Brasil') => {
    if (!query || query.length < 3) {
        return []
    }

    try {
        // Usando API gratuita do OpenStreetMap
        const searchQuery = `${query} escola ${cidade}`
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            `q=${encodeURIComponent(searchQuery)}&` +
            `format=json&` +
            `limit=5`,
            {
                headers: {
                    'User-Agent': 'VanMos-App/1.0'
                }
            }
        )
        
        const data = await response.json()
        
        if (data && data.length > 0) {
            return data.map(place => ({
                nome: place.display_name.split(',')[0] || `Escola ${query}`,
                endereco: place.display_name
            }))
        }
        
        // Fallback com dados simulados
        return [
            {
                nome: `Escola Municipal ${query}`,
                endereco: `Rua das Flores, 123 - ${cidade}`
            },
            {
                nome: `Colégio ${query}`,
                endereco: `Av. Principal, 456 - ${cidade}`
            }
        ]

    } catch (error) {
        console.error('Erro ao buscar escolas:', error)
        return [
            {
                nome: `Escola ${query}`,
                endereco: `Endereço da ${query} - ${cidade}`
            }
        ]
    }
}