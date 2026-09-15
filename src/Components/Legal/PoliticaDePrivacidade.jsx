import React from 'react'
import {
    faBuildingShield, faDatabase, faListCheck, faShareNodes, faLock,
    faClockRotateLeft, faUserShield, faChild, faEnvelope, faRotateRight, faCircleInfo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LegalLayout from './LegalLayout'
import './Legal.css'

const TOC = [
    { id: 'controlador', label: 'Controlador dos dados' },
    { id: 'dados-coletados', label: 'Quais dados coletamos' },
    { id: 'finalidade', label: 'Para que usamos' },
    { id: 'compartilhamento', label: 'Com quem compartilhamos' },
    { id: 'armazenamento', label: 'Armazenamento e segurança' },
    { id: 'retencao', label: 'Retenção e exclusão' },
    { id: 'direitos', label: 'Direitos do titular' },
    { id: 'criancas', label: 'Crianças e adolescentes' },
    { id: 'contato', label: 'Contato' },
    { id: 'alteracoes', label: 'Alterações' },
]

const PoliticaDePrivacidade = () => {
    return (
        <LegalLayout
            title="Política de Privacidade"
            subtitle="Como a VanMos coleta, usa e protege os dados de motoristas, responsáveis e alunos."
            badges={[
                { icon: faCircleInfo, label: 'Última atualização: 15/09/2026' },
                { icon: faBuildingShield, label: 'Conforme a LGPD (Lei 13.709/2018)' },
            ]}
            toc={TOC}
        >
            <div className="legal-intro">
                <p>
                    Esta Política de Privacidade descreve como a VanMos coleta, usa, armazena,
                    compartilha e protege os dados pessoais tratados neste site e no aplicativo
                    móvel, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº
                    13.709/2018 — LGPD). Ao aceitar os{' '}
                    <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer">Termos de Uso</a>{' '}
                    e utilizar a VanMos, você declara ter lido e compreendido esta Política.
                </p>
            </div>

            <section id="controlador" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faBuildingShield} /></span>
                    <h2>1. Controlador dos dados</h2>
                </div>
                <p>
                    A VanMos é responsável pelas decisões referentes ao tratamento de dados pessoais
                    realizado através do site e do aplicativo. Dúvidas ou solicitações sobre o
                    tratamento dos seus dados podem ser enviadas para{' '}
                    <a href="mailto:vanmos.support@gmail.com">vanmos.support@gmail.com</a>.
                </p>
            </section>

            <section id="dados-coletados" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faDatabase} /></span>
                    <h2>2. Quais dados coletamos</h2>
                </div>

                <h3>2.1. Motoristas</h3>
                <ul>
                    <li>Nome, CPF, RG, CNH, idade, gênero, telefone e e-mail;</li>
                    <li>Documentos digitalizados (RG e CNH) enviados para verificação cadastral;</li>
                    <li>Dados do veículo (modelo e placa da van);</li>
                    <li>Foto de perfil (avatar), quando enviada;</li>
                    <li>Status do processo de aprovação cadastral e, se aplicável, o motivo de reprovação;</li>
                    <li>Confirmação de aceite dos Termos de Uso e desta Política.</li>
                </ul>

                <h3>2.2. Responsáveis</h3>
                <ul>
                    <li>Nome, idade, gênero, CPF e e-mail, inseridos pelo motorista no cadastro do aluno;</li>
                    <li>Telefone de contato;</li>
                    <li>Senha de acesso ao aplicativo, armazenada de forma criptografada.</li>
                </ul>

                <h3>2.3. Alunos (dados de menores)</h3>
                <ul>
                    <li>Nome, endereços de embarque e desembarque, escola e turno;</li>
                    <li>Registros de presença/falta, com data e, quando informada, justificativa;</li>
                    <li>Posição do aluno na ordem de embarque da rota do motorista.</li>
                </ul>
                <p>
                    Os dados do aluno são inseridos pelo motorista no momento do cadastro do
                    responsável, com base na relação comercial já existente entre as partes.
                    <strong> O aluno não possui conta própria na plataforma</strong> — o tratamento de
                    seus dados é feito com base no consentimento do responsável legal e no legítimo
                    interesse de viabilizar o transporte contratado, nos termos do art. 14 da LGPD, que
                    rege o tratamento de dados de crianças e adolescentes.
                </p>

                <h3>2.4. Dados de uso e comunicação</h3>
                <ul>
                    <li>Mensagens trocadas no chat entre responsável e motorista, vinculadas ao aluno em comum;</li>
                    <li>Notificações geradas pela plataforma (ex.: aviso de motorista a caminho);</li>
                    <li>
                        Dados técnicos de sessão (token de autenticação), armazenados de forma segura
                        no dispositivo para manter o usuário conectado.
                    </li>
                </ul>
            </section>

            <section id="finalidade" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faListCheck} /></span>
                    <h2>3. Para que usamos esses dados</h2>
                </div>
                <ul>
                    <li>Viabilizar o cadastro, a autenticação e o funcionamento das contas;</li>
                    <li>Analisar e aprovar cadastros de motoristas, validando a documentação enviada;</li>
                    <li>Exibir e atualizar o andamento da rota e a posição do aluno para o responsável;</li>
                    <li>Registrar e exibir o histórico de presença/falta do aluno;</li>
                    <li>Permitir a comunicação em tempo real entre responsável e motorista;</li>
                    <li>Enviar notificações relacionadas ao serviço;</li>
                    <li>Cumprir obrigações legais e regulatórias aplicáveis e prevenir fraudes.</li>
                </ul>
                <p>
                    Não utilizamos os dados coletados para finalidades incompatíveis com estas, nem os
                    comercializamos.
                </p>
            </section>

            <section id="compartilhamento" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faShareNodes} /></span>
                    <h2>4. Com quem compartilhamos os dados</h2>
                </div>
                <ul>
                    <li>
                        <strong>Entre responsável e motorista vinculados ao mesmo aluno:</strong> cada um
                        vê apenas os dados necessários à execução do transporte daquele aluno — o
                        responsável nunca vê dados de outros alunos da rota;
                    </li>
                    <li>
                        <strong>Dados públicos do motorista</strong> (nome, foto, modelo e placa da van)
                        ficam visíveis aos responsáveis dos alunos que ele transporta, para
                        identificação do veículo/condutor;
                    </li>
                    <li>
                        <strong>Prestadores de infraestrutura</strong> que operam o backend e o
                        armazenamento da VanMos, sob obrigações contratuais de confidencialidade e
                        segurança;
                    </li>
                    <li>
                        <strong>Autoridades públicas</strong>, quando exigido por lei, ordem judicial ou
                        requisição regulatória.
                    </li>
                </ul>
                <p>Não vendemos nem compartilhamos dados pessoais com terceiros para fins de publicidade.</p>
            </section>

            <section id="armazenamento" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faLock} /></span>
                    <h2>5. Armazenamento e segurança</h2>
                </div>
                <p>
                    As senhas são armazenadas de forma criptografada e nunca são retornadas em
                    nenhuma consulta. A autenticação utiliza tokens (JWT) armazenados de forma segura
                    no dispositivo do usuário, usados para manter a sessão ativa sem reenvio de senha.
                </p>
                <p>
                    Fotos de perfil e documentos de motoristas (RG/CNH) são armazenados de forma
                    associada exclusivamente ao respectivo cadastro, com acesso restrito ao próprio
                    usuário e à equipe responsável pela análise cadastral.
                </p>
                <div className="legal-callout">
                    <span className="legal-callout-icon"><FontAwesomeIcon icon={faCircleInfo} /></span>
                    <p>
                        Adotamos medidas técnicas e administrativas razoáveis para proteger os dados
                        contra acessos não autorizados, perda, alteração ou vazamento. Caso ocorra um
                        incidente de segurança relevante, os titulares afetados e a Autoridade Nacional
                        de Proteção de Dados (ANPD) serão notificados conforme exigido pela LGPD.
                    </p>
                </div>
            </section>

            <section id="retencao" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faClockRotateLeft} /></span>
                    <h2>6. Retenção e exclusão dos dados</h2>
                </div>
                <p>
                    Mantemos os dados pessoais pelo tempo necessário para cumprir as finalidades
                    descritas nesta Política, para atender obrigações legais/regulatórias ou para o
                    exercício regular de direitos. Encerrado o vínculo com a plataforma, os dados são
                    removidos ou anonimizados, ressalvadas hipóteses de guarda obrigatória por lei.
                </p>
            </section>

            <section id="direitos" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faUserShield} /></span>
                    <h2>7. Direitos do titular dos dados</h2>
                </div>
                <p>
                    Nos termos da LGPD, você — ou, no caso de um aluno, seu responsável legal — pode
                    solicitar a qualquer momento:
                </p>
                <ul>
                    <li>Confirmação da existência de tratamento e acesso aos dados;</li>
                    <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
                    <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a LGPD;</li>
                    <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
                    <li>Eliminação dos dados tratados com base no consentimento;</li>
                    <li>Revogação do consentimento, a qualquer momento;</li>
                    <li>Informação sobre com quem os dados são compartilhados.</li>
                </ul>
                <p>
                    Solicitações podem ser feitas pelo canal de contato indicado abaixo. Podemos
                    solicitar dados adicionais para confirmar sua identidade antes de atender ao
                    pedido.
                </p>
            </section>

            <section id="criancas" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faChild} /></span>
                    <h2>8. Dados de crianças e adolescentes</h2>
                </div>
                <p>
                    Conforme explicado na Seção 2.3, os alunos não possuem conta própria nem acessam a
                    plataforma diretamente — seus dados são inseridos e geridos pelo motorista, com
                    base na relação já existente com o responsável legal. O responsável pode, a
                    qualquer momento, solicitar a correção ou exclusão dos dados do aluno sob sua
                    responsabilidade através do canal de contato abaixo.
                </p>
            </section>

            <section id="contato" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                    <h2>9. Contato</h2>
                </div>
                <p>
                    Dúvidas, solicitações ou reclamações relacionadas a esta Política de Privacidade
                    podem ser enviadas para:{' '}
                    <a href="mailto:vanmos.support@gmail.com">vanmos.support@gmail.com</a>.
                </p>
            </section>

            <section id="alteracoes" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faRotateRight} /></span>
                    <h2>10. Alterações desta Política</h2>
                </div>
                <p>
                    Esta Política pode ser atualizada periodicamente para refletir mudanças na
                    plataforma, em nossas práticas de tratamento de dados ou na legislação aplicável.
                    A versão vigente estará sempre disponível no site e no aplicativo, com a data da
                    última atualização indicada no topo desta página.
                </p>
            </section>
        </LegalLayout>
    )
}

export default PoliticaDePrivacidade
