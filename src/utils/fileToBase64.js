// Primeiro upload de arquivo do site (avatar só existe no app mobile hoje).
// Converte pra data URI base64 — mesmo formato já usado por avatarBase64
// no backend ("data:image/jpeg;base64,..."), sem storage externo.
export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
