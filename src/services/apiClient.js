// Cliente HTTP compartilhado por todos os services que falam com a API do VanMos.
// Centraliza: URL base, headers JSON, injeção condicional do "Authorization: Bearer",
// e tratamento consistente de erros (lança Error com a mensagem vinda do backend).
//
// O backend do VanMos responde no formato padronizado ApiResponse<T>:
//   { sucesso, status, mensagem, dados, erros, timestamp }
// então "mensagem" é o campo confiável para mostrar ao usuário em caso de erro.

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://vanmosapi.onrender.com/api').replace(/\/+$/, '')

const buildAuthHeader = () => {
  const token = localStorage.getItem('admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const parseBody = async (response) => {
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) return null
  try {
    return await response.json()
  } catch {
    return null
  }
}

/**
 * Faz uma requisição à API do VanMos.
 *
 * @param {string} path - Caminho relativo (ex: '/cadastro') ou URL absoluta.
 * @param {object} [options]
 * @param {string} [options.method='GET']
 * @param {object} [options.body] - Corpo a ser serializado como JSON.
 * @param {boolean} [options.auth=false] - Se true, injeta "Authorization: Bearer <admin_token>".
 * @param {object} [options.headers] - Headers extras/sobrescritos.
 * @param {boolean} [options.throwOnError=true] - Se true (padrão), lança Error quando
 *   `response.ok` é falso, usando a mensagem do backend (`mensagem`/`message`). Se false,
 *   retorna o corpo já parseado independente do status — útil para endpoints em que uma
 *   resposta "não-ok" ainda é um resultado de negócio válido (ex.: login com credenciais
 *   inválidas retorna 401 com { sucesso: false, mensagem: '...' }, não uma falha inesperada).
 * @param {string} [options.fallbackMessage] - Mensagem a usar quando a resposta de erro
 *   não trouxer `mensagem`/`message` do backend.
 * @returns {Promise<any>} corpo da resposta já parseado (ou null se não houver corpo JSON)
 */
export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    body,
    auth = false,
    headers = {},
    throwOnError = true,
    fallbackMessage = 'Não foi possível completar a requisição',
  } = options

  const url = /^https?:\/\//.test(path) ? path : `${API_BASE_URL}${path}`

  let response
  try {
    response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(auth ? buildAuthHeader() : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new Error('Erro de conexão com o servidor')
  }

  const data = await parseBody(response)

  if (!response.ok && throwOnError) {
    const mensagem = (data && (data.mensagem || data.message)) || fallbackMessage
    const error = new Error(mensagem)
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export { API_BASE_URL }
