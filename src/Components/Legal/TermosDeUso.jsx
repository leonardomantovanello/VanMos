import React from 'react'
import {
    faVanShuttle, faIdCard, faUserGroup, faLock, faListCheck,
    faScaleBalanced, faCopyright, faRotateRight, faGavel, faEnvelope, faCircleInfo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LegalLayout from './LegalLayout'
import './Legal.css'

const TOC = [
    { id: 'o-que-e', label: 'O que é a VanMos' },
    { id: 'cadastro-motorista', label: 'Cadastro de motorista' },
    { id: 'cadastro-responsaveis', label: 'Responsáveis e alunos' },
    { id: 'contas-seguranca', label: 'Contas e segurança' },
    { id: 'regras-de-uso', label: 'Regras de uso' },
    { id: 'responsabilidades', label: 'Responsabilidades' },
    { id: 'propriedade-intelectual', label: 'Propriedade intelectual' },
    { id: 'alteracoes', label: 'Alterações' },
    { id: 'lei-aplicavel', label: 'Lei aplicável' },
    { id: 'contato', label: 'Contato' },
]

const TermosDeUso = () => {
    return (
        <LegalLayout
            title="Termos de Uso"
            subtitle="As regras que valem para motoristas e responsáveis dentro da plataforma VanMos."
            badges={[
                { icon: faCircleInfo, label: 'Última atualização: 15/09/2026' },
            ]}
            toc={TOC}
        >
            <div className="legal-intro">
                <p>
                    Estes Termos de Uso ("Termos") regulam o acesso e a utilização da plataforma
                    VanMos — composta por este site e pelo aplicativo móvel VanMos — por{' '}
                    <strong>motoristas</strong> (que prestam o serviço de transporte escolar/van) e{' '}
                    <strong>responsáveis</strong> (que contratam o transporte para um aluno). Ao criar
                    uma conta, marcar a caixa de aceite no cadastro ou utilizar qualquer parte da
                    plataforma, você concorda integralmente com estes Termos e com a nossa{' '}
                    <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
                        Política de Privacidade
                    </a>
                    . Se você não concorda, não utilize a VanMos.
                </p>
            </div>

            <section id="o-que-e" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faVanShuttle} /></span>
                    <h2>1. O que é a VanMos</h2>
                </div>
                <p>
                    A VanMos é uma plataforma de gestão de transporte escolar/van que conecta
                    motoristas e responsáveis, oferecendo ferramentas para:
                </p>
                <ul>
                    <li>Cadastrar e aprovar motoristas mediante análise documental;</li>
                    <li>Cadastrar responsáveis e alunos vinculados à rota de um motorista;</li>
                    <li>Acompanhar em tempo real o andamento da rota e a posição do aluno;</li>
                    <li>Registrar e consultar faltas/presenças do aluno;</li>
                    <li>Trocar mensagens entre responsável e motorista;</li>
                    <li>Gerenciar pontos de parada da rota (embarque/desembarque).</li>
                </ul>
                <div className="legal-callout">
                    <span className="legal-callout-icon"><FontAwesomeIcon icon={faCircleInfo} /></span>
                    <p>
                        <strong>A VanMos não é uma transportadora</strong> e não presta, por si, o
                        serviço de transporte escolar. A contratação do transporte é um acordo
                        comercial firmado diretamente entre o responsável e o motorista. A VanMos
                        fornece apenas as ferramentas digitais de gestão e comunicação desse serviço.
                    </p>
                </div>
            </section>

            <section id="cadastro-motorista" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faIdCard} /></span>
                    <h2>2. Cadastro de motorista e aprovação</h2>
                </div>
                <p>
                    O motorista se cadastra neste site informando dados pessoais (nome, CPF, RG, CNH,
                    idade, gênero, telefone, e-mail), documentos digitalizados (RG e CNH) e dados do
                    veículo (modelo e placa). O cadastro passa por análise da equipe VanMos antes da
                    liberação de acesso ao painel, podendo ser aprovado, reprovado (com justificativa)
                    ou mantido pendente.
                </p>
                <p>
                    Este site é destinado exclusivamente ao uso por motoristas. Responsáveis e alunos
                    utilizam o serviço através do aplicativo móvel VanMos.
                </p>
            </section>

            <section id="cadastro-responsaveis" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faUserGroup} /></span>
                    <h2>3. Cadastro de responsáveis e alunos</h2>
                </div>
                <p>
                    Após aprovado, o motorista utiliza seu painel para cadastrar os responsáveis e
                    alunos que compõem sua rota, informando dados como nome, CPF, e-mail, idade e
                    gênero do responsável, e nome, endereços de embarque/desembarque, escola e turno
                    do aluno. Ao cadastrar esses dados, o motorista declara ter obtido a autorização
                    do responsável legal para o tratamento dessas informações na plataforma.
                </p>
                <p>
                    O responsável passa a acessar sua conta pelo aplicativo VanMos, podendo consultar
                    e corrigir seus dados e os do aluno sob sua responsabilidade.
                </p>
            </section>

            <section id="contas-seguranca" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faLock} /></span>
                    <h2>4. Contas e segurança</h2>
                </div>
                <p>
                    Você é responsável por manter a veracidade, exatidão e atualização dos dados
                    informados, bem como pela guarda sigilosa de sua senha e demais credenciais de
                    acesso. Notifique-nos imediatamente em caso de uso não autorizado da sua conta.
                </p>
                <p>
                    A VanMos pode suspender ou encerrar contas que forneçam informações falsas,
                    violem estes Termos, ou cujo cadastro de motorista seja reprovado na análise
                    documental.
                </p>
            </section>

            <section id="regras-de-uso" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faListCheck} /></span>
                    <h2>5. Regras de uso</h2>
                </div>
                <p>Ao usar a VanMos, você concorda em:</p>
                <ul>
                    <li>Não inserir dados falsos, incompletos de má-fé ou de terceiros sem autorização;</li>
                    <li>
                        Utilizar o chat exclusivamente para comunicação relacionada ao transporte do
                        aluno, sem conteúdo ofensivo, ilegal, discriminatório ou que viole direitos de
                        terceiros;
                    </li>
                    <li>Não tentar acessar contas, dados ou rotas de outros usuários sem autorização;</li>
                    <li>Não utilizar a plataforma para finalidade diversa da gestão do transporte escolar/van;</li>
                    <li>Respeitar a legislação de trânsito e de transporte de escolares, no caso dos motoristas.</li>
                </ul>
            </section>

            <section id="responsabilidades" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faScaleBalanced} /></span>
                    <h2>6. Responsabilidades e limitações</h2>
                </div>
                <p>
                    A VanMos envida esforços para manter a plataforma disponível e funcionando
                    corretamente, mas não garante disponibilidade ininterrupta, ausência de falhas ou
                    precisão absoluta de informações como o andamento de uma rota, que dependem de
                    dados informados pelo motorista.
                </p>
                <p>
                    A VanMos não se responsabiliza pela qualidade, segurança, pontualidade ou
                    qualquer aspecto da execução do serviço de transporte em si, tampouco por acordos
                    comerciais, valores ou condições combinadas entre responsável e motorista fora da
                    plataforma. A aprovação de cadastro de um motorista se limita à validação
                    documental para uso da plataforma.
                </p>
                <p>
                    Funcionalidades sinalizadas como "em desenvolvimento" no site ou no aplicativo
                    ainda não estão disponíveis e podem ser lançadas em atualizações futuras.
                </p>
            </section>

            <section id="propriedade-intelectual" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faCopyright} /></span>
                    <h2>7. Propriedade intelectual</h2>
                </div>
                <p>
                    Marca, layout, código e demais elementos da plataforma VanMos pertencem aos seus
                    desenvolvedores/mantenedores. É vedada a reprodução, engenharia reversa ou uso
                    não autorizado desses elementos fora da plataforma.
                </p>
            </section>

            <section id="alteracoes" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faRotateRight} /></span>
                    <h2>8. Alterações destes Termos</h2>
                </div>
                <p>
                    Podemos atualizar estes Termos periodicamente para refletir mudanças na
                    plataforma ou na legislação aplicável. Alterações relevantes serão comunicadas
                    pelos canais da VanMos, e o uso continuado após a atualização implica aceite dos
                    novos Termos.
                </p>
            </section>

            <section id="lei-aplicavel" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faGavel} /></span>
                    <h2>9. Lei aplicável</h2>
                </div>
                <p>
                    Estes Termos são regidos pelas leis da República Federativa do Brasil, aplicando-se
                    o foro do domicílio do usuário para dirimir eventuais controvérsias, salvo
                    disposição legal em contrário.
                </p>
            </section>

            <section id="contato" className="legal-card">
                <div className="legal-card-header">
                    <span className="legal-card-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                    <h2>10. Contato</h2>
                </div>
                <p>
                    Dúvidas sobre estes Termos podem ser enviadas para:{' '}
                    <a href="mailto:vanmos.support@gmail.com">vanmos.support@gmail.com</a>.
                </p>
            </section>
        </LegalLayout>
    )
}

export default TermosDeUso
