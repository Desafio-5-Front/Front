import React, { useState } from "react"
import "./App.css"
import homeImage from "./images/home.png"
import iconImage from "./images/icon.png"

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="app">
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <img src={iconImage} alt="ConectaSUS Logo" />
                    </div>
                    <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>☰</button>
                    <nav className={`nav ${isOpen ? "open" : ""}`}>
                    <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
                    <a href="#about" onClick={() => setIsOpen(false)}>Sobre</a>
                    <a href="#features" onClick={() => setIsOpen(false)}>Funções</a>
                    <a href="#" onClick={() => setIsOpen(false)}>Login</a>
                    <a href="#footer" onClick={() => setIsOpen(false)}>Contato</a>
                    </nav>
                </div>
            </header>
            <section id='home' className="hero">
                <div className="hero-background" style={{ backgroundImage: `url(${homeImage})` }}></div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-left">
                            <h1 className="hero-title">ConectaSUS</h1>
                            <h2 className="hero-subtitle">Acesse informações relevantes de saúde</h2>
                            <p className="hero-description">
                                O ConectaSUS é um portal digital que facilita o acesso aos serviços do SUS. Consulte vacinação, exames,
                                atendimentos e encontre unidades de saúde de forma simples, rápida e integrada.
                            </p>
                             <div className="hero-buttons">
                                <button className="btn" style={{ marginTop: "-300px" }}>Consultar unidades →</button>
                                <button className="btn" style={{ marginTop: "20px" }}>Dashboard →</button>
                                <button className="btn" style={{ marginTop: "20px" }}>Jogar agora →</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id='about' className="about">
                <div className="container">
                    <h2 className="about-title">Sobre o projeto</h2>
                    <p className="about-description">
                        O ConectaSUS é a sua porta de entrada para uma saúde pública mais acessível e transparente. Descubra nossos
                        serviços e experimente uma nova forma de gerenciar seu cuidado com agilidade e confiança.
                    </p>
                    <div className="about-box">
                        <p className="about-description">
                            Cada detalhe foi pensado para você. Aqui, a tecnologia anda de mãos dadas com o cuidado:
                            facilitamos o acesso à informação, aos serviços de saúde e ao seu histórico, porque acreditamos que estar
                            bem informado é o primeiro passo para ser bem cuidado.
                        </p>
                    </div>
                </div>
            </section>
            <section id='features'className="features">
                <div className="container">
                    <h1 className="features-main-title">Conheça as funcionalidades</h1>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-image-container">
                                <img src={require("./images/lupa.png")}alt="Ícone de lupa - Dados de saúde" className="feature-image"/>
                            </div>
                            <div className="feature-content">
                                <h2 className="feature-title">Conheça dados importantes de saúde</h2>
                                <p className="feature-description"> Acesse seu prontuário, resultados de exames e vacinas registradas em um só lugar.</p>
                                <button className="feature-button">Clique aqui <span className="arrow">→</span></button>
                            </div>
                        </div>
                        <div className="feature-card">
                            <div className="feature-image-container">
                                <img src={require("./images/medic.png")} alt="Ícone de localização" className="feature-image"/>
                            </div>
                            <div className="feature-content">
                                <h2 className="feature-title">Veja a unidade mais próxima</h2>
                                <p className="feature-description">
                                    Encontre facilmente postos, clínicas e hospitais do SUS pelo mapa interativo.
                                </p>
                                <button className="feature-button">Clique aqui <span className="arrow">→</span></button>
                            </div>
                        </div>
                        <div className="feature-card">
                            <div className="feature-image-container">
                                <img src={require("./images/paper.png")} alt="Ícone de jogo" className="feature-image"/>
                            </div>
                            <div className="feature-content">
                                <h2 className="feature-title">Aprenda enquanto joga</h2>
                                <p className="feature-description">
                                    Conheça nosso jogo sobre saúde e transforme conhecimento em prática de forma divertida.
                                </p>
                                <button className="feature-button"> Clique aqui <span className="arrow">→</span> </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer id='footer' className="footer">
                <div className="footer-logos">
                    <img src={require("./images/inova.png")} alt="Logo INOVA" className="footer-logo" />
                    <img src={require("./images/icon2.png")} alt="Logo Governo" className="footer-logo" />
                    <img src={require("./images/secti.png")} alt="Logo SECTI" className="footer-logo" />
                </div>
                <div className="footer-contact">
                    Contato: conectasusgp2@gmail.com
                </div>
            </footer>       
        </div>
    )
}

export default Header
