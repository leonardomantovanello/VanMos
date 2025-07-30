import React, { useEffect, useState } from 'react'
import './QuemSomos.css'

const QuemSomos = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className="quem-somos-container">
            {/* Hero Section */}
            <section className={`hero-about ${isVisible ? 'fade-in' : ''}`}>
                <div className="hero-content">
                    <h1 className="hero-title">
                        Sobre a <span className="highlight">VanMos</span>
                    </h1>
                    <p className="hero-description">
                        Revolucionando o transporte urbano com tecnologia, segurança e conforto
                    </p>
                </div>
                
                {/* Animated background elements */}
                <div className="bg-elements">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                </div>
            </section>

            {/* Nossa História */}
            <section className="nossa-historia">
                <div className="container">
                    <div className="content-grid">
                        <div className="text-content">
                            <h2 className="section-title">Nossa História</h2>
                            <p>
                                Fundada em 2025, a VanMos nasceu da necessidade de transformar o transporte urbano 
                                brasileiro. Identificamos que havia uma lacuna entre a demanda por transporte de 
                                qualidade e as opções disponíveis no mercado.
                            </p>
                            <p>
                                Começamos como uma startup focada em conectar motoristas qualificados com passageiros 
                                que buscavam um transporte mais seguro, confortável e confiável. Hoje, somos referência 
                                em mobilidade urbana inteligente.
                            </p>
                            <div className="stats-mini">
                                <div className="stat">
                                    <span className="number">1</span>
                                    <span className="label">Ano de Experiência</span>
                                </div>
                                <div className="stat">
                                    <span className="number">500+</span>
                                    <span className="label">Motoristas Ativos</span>
                                </div>
                            </div>
                        </div>
                        <div className="image-content">
                            <div className="story-card">
                                <div className="card-icon">🚐</div>
                                <h3>2025</h3>
                                <p>Fundação da VanMos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nossa Missão */}
            <section className="missao-visao">
                <div className="container">
                    <div className="mvv-grid">
                        <div className="mvv-card">
                            <div className="mvv-icon">🎯</div>
                            <h3>Missão</h3>
                            <p>
                                Conectar pessoas através de um transporte seguro, eficiente e sustentável, 
                                melhorando a qualidade de vida nas cidades brasileiras.
                            </p>
                        </div>
                        <div className="mvv-card">
                            <div className="mvv-icon">👁️</div>
                            <h3>Visão</h3>
                            <p>
                                Ser a principal plataforma de mobilidade urbana do Brasil, reconhecida pela 
                                excelência em serviço e inovação tecnológica.
                            </p>
                        </div>
                        <div className="mvv-card">
                            <div className="mvv-icon">⭐</div>
                            <h3>Valores</h3>
                            <p>
                                Segurança, transparência, sustentabilidade, inovação e compromisso com a 
                                satisfação de nossos usuários e motoristas parceiros.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nossa Equipe */}
            <section className="nossa-equipe">
                <div className="container">
                    <h2 className="section-title">Nossa Equipe</h2>
                    <p className="section-subtitle">
                        Profissionais dedicados em transformar a mobilidade urbana
                    </p>
                    
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="member-avatar">
                                <span>👨‍💼</span>
                            </div>
                            <h4>José Matheus</h4>
                            <p className="role">CEO</p>
                            <p className="bio">
                                Visionário em mobilidade urbana com mais de 10 anos de experiência em tecnologia 
                                e transporte.
                            </p>
                        </div>
                        
                        <div className="team-member">
                            <div className="member-avatar">
                                <span>👨‍💼</span>
                            </div>
                            <h4>Jonathan Gabriel</h4>
                            <p className="role">Co-CEO</p>
                            <p className="bio">
                                Líder estratégico focado em expansão de mercado e desenvolvimento de parcerias 
                                estratégicas para o crescimento da empresa.
                            </p>
                        </div>
                        
                        <div className="team-member">
                            <div className="member-avatar">
                                <span>👨‍💻</span>
                            </div>
                            <h4>Leonardo Mantovanello</h4>
                            <p className="role">CTO</p>
                            <p className="bio">
                                Especialista em desenvolvimento de plataformas escaláveis e arquitetura de sistemas 
                                para transporte inteligente.
                            </p>
                        </div>
                        
                        <div className="team-member">
                            <div className="member-avatar">
                                <span>👨‍💻</span>
                            </div>
                            <h4>Matheus Fernandes</h4>
                            <p className="role">CTO</p>
                            <p className="bio">
                                Expert em inteligência artificial e machine learning aplicada à otimização 
                                de rotas e experiência do usuário.
                            </p>
                        </div>
                        
                        <div className="team-member">
                            <div className="member-avatar">
                                <span>👨‍🔧</span>
                            </div>
                            <h4>Pedro Silva</h4>
                            <p className="role">Diretor de Operações</p>
                            <p className="bio">
                                Responsável pela qualidade dos serviços e relacionamento com motoristas parceiros 
                                em todo o país.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nossos Diferenciais */}
            <section className="diferenciais">
                <div className="container">
                    <h2 className="section-title">Nossos Diferenciais</h2>
                    <div className="diferenciais-grid">
                        <div className="diferencial-item">
                            <div className="diferencial-icon">🛡️</div>
                            <h4>Segurança Avançada</h4>
                            <p>Verificação rigorosa de motoristas, GPS em tempo real e sistema de emergência 24/7</p>
                        </div>
                        
                        <div className="diferencial-item">
                            <div className="diferencial-icon">🤖</div>
                            <h4>Tecnologia de Ponta</h4>
                            <p>IA para otimização de rotas, app intuitivo e sistema de pagamento integrado</p>
                        </div>
                        
                        <div className="diferencial-item">
                            <div className="diferencial-icon">🌱</div>
                            <h4>Sustentabilidade</h4>
                            <p>Frota de veículos eco-friendly e compromisso com a redução de emissões</p>
                        </div>
                        
                        <div className="diferencial-item">
                            <div className="diferencial-icon">💰</div>
                            <h4>Preços Justos</h4>
                            <p>Tarifas transparentes, sem taxa de cancelamento e promoções regulares</p>
                        </div>
                        
                        <div className="diferencial-item">
                            <div className="diferencial-icon">⚡</div>
                            <h4>Rapidez</h4>
                            <p>Tempo médio de espera de 3 minutos e rotas otimizadas em tempo real</p>
                        </div>
                        
                        <div className="diferencial-item">
                            <div className="diferencial-icon">🎯</div>
                            <h4>Foco no Cliente</h4>
                            <p>Suporte 24/7, avaliação de motoristas e programa de fidelidade</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default QuemSomos
