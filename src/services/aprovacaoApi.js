import { apiRequest } from './apiClient'

const BASE_PATH = '/passageiros/aprovacao'

// Fluxo público de aprovação/reprovação de cadastro de motorista por
// e-mail — sem login, a prova de identidade é o token do link recebido.
// throwOnError:false porque token inválido/expirado é um resultado de
// negócio normal que a página de revisão precisa renderizar inline, não
// uma falha inesperada (mesmo padrão de cadastro.js).
export const aprovacaoApi = {
  buscarPorToken: async (token) =>
    apiRequest(`${BASE_PATH}/${encodeURIComponent(token)}`, { throwOnError: false }),

  aprovar: async (token) =>
    apiRequest(`${BASE_PATH}/${encodeURIComponent(token)}/aprovar`, {
      method: 'POST',
      throwOnError: false,
    }),

  reprovar: async (token, motivo) =>
    apiRequest(`${BASE_PATH}/${encodeURIComponent(token)}/reprovar`, {
      method: 'POST',
      body: { motivo },
      throwOnError: false,
    }),
}
