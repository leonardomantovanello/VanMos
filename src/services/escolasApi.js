// Lista curada de escolas de Barueri, SP (estaduais, municipais e
// particulares). Fonte: Secretaria de Educação de Barueri
// (educbarueri.sp.gov.br) e cadastro público de escolas (escolas.com.br,
// que replica o Censo Escolar/INEP) — a lista municipal completa tem 114
// escolas, aqui está uma amostra; o cadastro oficial fica em
// educbarueri.sp.gov.br/escolas-municipais.
//
// `listar()` devolve uma Promise só pra já ter a mesma assinatura de uma
// chamada de API real — trocar por um GET /api/escolas?cidade=Barueri do
// backend no futuro não exige mudar quem consome (Motorista.jsx).
const ESCOLAS_BARUERI = [
    // Estaduais (lista completa das 20 escolas estaduais de Barueri)
    { nome: 'EE Alayde Domingues Couto Macedo Professora', rede: 'Estadual', bairro: 'Jardim Tupã' },
    { nome: 'EE Aldeia de Barueri', rede: 'Estadual', bairro: 'Nova Aldeinha' },
    { nome: 'EE Amador Aguiar', rede: 'Estadual', bairro: 'Parque Imperial' },
    { nome: 'EE Caio Prado Júnior Deputado', rede: 'Estadual', bairro: 'Vila Morellato' },
    { nome: 'Etec Antônio Furlan', rede: 'Estadual', bairro: 'Centro' },
    { nome: 'EE Henrique Fernando Gomes Estudante', rede: 'Estadual', bairro: 'Votupoca' },
    { nome: 'EE Itajahy Feitosa Martins Professor', rede: 'Estadual', bairro: 'Parque dos Camargos' },
    { nome: 'EE Ivani Maria Paes Professora', rede: 'Estadual', bairro: 'Vila Boa Vista' },
    { nome: 'EE Jardim Maria Helena I', rede: 'Estadual', bairro: 'Parque dos Camargos' },
    { nome: 'EE Jardim Paulista', rede: 'Estadual', bairro: 'Votupoca' },
    { nome: 'EE José Domingos da Silveira Professor', rede: 'Estadual', bairro: 'Jardim Mutinga' },
    { nome: 'EE José Wilson Padinha Professor', rede: 'Estadual', bairro: 'Jardim Belval' },
    { nome: 'EE Lênio Vieira de Moraes Professor', rede: 'Estadual', bairro: 'Jardim Santa Mônica' },
    { nome: 'EE Leonor Mendes de Barros', rede: 'Estadual', bairro: 'Empresarial 18 do Forte' },
    { nome: 'EE Mário Joaquim Escobar de Andrade', rede: 'Estadual', bairro: 'Parque Viana' },
    { nome: 'EE Myrthes Therezinha Assad Villela Professora', rede: 'Estadual', bairro: 'Centro' },
    { nome: 'EE Nestor de Camargo Prefeito', rede: 'Estadual', bairro: 'Jardim Mutinga' },
    { nome: 'EE Parque Imperial', rede: 'Estadual', bairro: 'Parque Imperial' },
    { nome: 'EE República de Cuba', rede: 'Estadual', bairro: 'Jardim Itaquiti' },
    { nome: 'EE República do Equador', rede: 'Estadual', bairro: 'Vila Engenho Novo' },

    // Municipais (amostra — cadastro completo em educbarueri.sp.gov.br/escolas-municipais)
    { nome: 'EMEF Deputado Agenor Lino de Matos', rede: 'Municipal', bairro: 'Vila Universal' },
    { nome: 'EMEF Professor Alcino Francisco de Souza', rede: 'Municipal', bairro: 'Jardim Silveira' },
    { nome: 'EMEF Professor Alexandrino da Silveira Bueno', rede: 'Municipal', bairro: 'Jardim Silveira' },
    { nome: 'EMEF Professor Alfredo do Carmo', rede: 'Municipal', bairro: 'Vila Nova Barueri' },
    { nome: 'EMEF Amador Aguiar', rede: 'Municipal', bairro: 'Parque Imperial' },
    { nome: 'EMEF Anna Irene Mazaro de Freitas', rede: 'Municipal', bairro: 'Parque Viana' },
    { nome: 'EMEF Professora Aparecida Conceição Soares Akyama', rede: 'Municipal', bairro: 'Jardim Belval' },
    { nome: 'EMEF Aracy Martins de Lima', rede: 'Municipal', bairro: 'Jardim Belval' },
    { nome: 'EMEF Professor Aristides da Costa e Silva', rede: 'Municipal', bairro: 'Jardim Belval' },
    { nome: 'EMEF Armando Cavazza', rede: 'Municipal', bairro: 'Vila Engenho Novo' },
    { nome: 'EMEF Benedito Adherbal Farbo', rede: 'Municipal', bairro: 'Vale do Sol' },
    { nome: 'EMEF Benedito Venâncio', rede: 'Municipal', bairro: 'Jardim Regina Alice' },
    { nome: 'EMEF Bruno Tolaini', rede: 'Municipal', bairro: 'Parque Viana' },
    { nome: 'EMEF Professor Carlos Osmarinho de Lima', rede: 'Municipal', bairro: 'Jardim Florida' },
    { nome: 'EMEF Professora Dalva Fogaça', rede: 'Municipal', bairro: 'Jardim Silveira' },
    { nome: 'EMEF Décio Trujillo', rede: 'Municipal', bairro: 'Vila Militar' },
    { nome: 'EMEF Reverendo Deiro Felício de Andrade', rede: 'Municipal', bairro: 'Jardim Paulista' },
    { nome: 'EMEF Dorival Faria', rede: 'Municipal', bairro: 'Jardim Tupanci' },
    { nome: 'EMM Professora Edneia Matos Nogueira', rede: 'Municipal', bairro: 'Jardim Regina Alice' },
    { nome: 'EMEF Professor Egídio Costa', rede: 'Municipal', bairro: 'Jardim Califórnia' },
    { nome: 'EMEF Professora Eglê Aparecida Rodrigues Campos', rede: 'Municipal', bairro: 'Jardim Audir' },
    { nome: 'EMEF Professor Eizaburo Nomura', rede: 'Municipal', bairro: 'Jardim Itaparica' },
    { nome: 'EMEF Professora Eliane Castanon Pereira', rede: 'Municipal', bairro: 'Chácara Marco' },
    { nome: 'EMEF Vereadora Elisabet Titto', rede: 'Municipal', bairro: 'Vila Iracema/Belval' },
    { nome: 'EMEF Elisabete Rodrigues Nunes de Mello', rede: 'Municipal', bairro: 'Votupoca' },
    { nome: 'EMEF Professora Elizabeth Parminondi Romero', rede: 'Municipal', bairro: 'Jardim Graziela' },
    { nome: 'EMEF Professora Elvira Lefevre Salles Nemer', rede: 'Municipal', bairro: 'Vila São João' },
    { nome: 'EMEF Eminoldo Harger', rede: 'Municipal', bairro: 'Parque Imperial' },

    // ITB (Instituto Técnico de Barueri "Brasílio Flores de Azevedo"),
    // mantido pela FIEB — ensino técnico gratuito, 7 unidades na cidade
    // (fonte: fieb.edu.br).
    { nome: 'ITB - Unidade Aldeia da Serra', rede: 'Técnica (ITB/FIEB)', bairro: 'Aldeia da Serra' },
    { nome: 'ITB - Unidade Alphaville', rede: 'Técnica (ITB/FIEB)', bairro: 'Alphaville Empresarial' },
    { nome: 'ITB - Unidade Engenho Novo', rede: 'Técnica (ITB/FIEB)', bairro: 'Engenho Novo' },
    { nome: 'ITB - Unidade Jardim Belval', rede: 'Técnica (ITB/FIEB)', bairro: 'Jardim Belval' },
    { nome: 'ITB - Unidade Jardim Maria Cristina', rede: 'Técnica (ITB/FIEB)', bairro: 'Jardim Maria Cristina' },
    { nome: 'ITB - Unidade Jardim Paulista', rede: 'Técnica (ITB/FIEB)', bairro: 'Jardim Paulista' },
    { nome: 'ITB - Unidade Parque Imperial', rede: 'Técnica (ITB/FIEB)', bairro: 'Parque Imperial' },

    // Particulares
    { nome: 'Colégio Presbiteriano Mackenzie Tamboré', rede: 'Particular', bairro: 'Tamboré' },
    { nome: 'Colégio Anglo Leonardo da Vinci', rede: 'Particular', bairro: 'Alphaville' },
    { nome: 'Colégio Anglo Aldeia da Serra', rede: 'Particular', bairro: 'Aldeia da Serra' },
    { nome: 'Escola Internacional de Alphaville', rede: 'Particular', bairro: 'Alphaville' },
    { nome: 'Colégio Pentágono Alphaville', rede: 'Particular', bairro: 'Alphaville' },
    { nome: 'Aldeia Mirim Escola de Educação Infantil e Ensino Fundamental', rede: 'Particular', bairro: 'Aldeia da Serra' },
].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))

export const escolasApi = {
    listar: async () => new Promise((resolve) => setTimeout(() => resolve(ESCOLAS_BARUERI), 0)),
}
