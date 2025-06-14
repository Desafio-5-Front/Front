import type React from "react"
import "./App.css"
import homeImage from "./images/home.png"
import iconImage from "./images/icon.png"

const App: React.FC = () => {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          {/* Logo modificada aqui */}
          <div className="logo">
            <img src={iconImage} alt="ConectaSUS Logo" />
          </div>
          <nav className="nav">
            <a href="#">Home</a>
            <a href="#">Sobre</a>
            <a href="#">Login</a>
            <a href="#">Contato</a>
          </nav>
        </div>
      </header>
      <section className="hero" style={{ height: '700px' }}>
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
              <div className="hero-buttons" style={{ marginLeft: "800px" }}>
                <button className="btn" style={{ marginTop: "-300px" }}>Consultar unidades →</button>
                <button className="btn" style={{ marginTop: "20px" }}>Dashboard →</button>
                <button className="btn" style={{ marginTop: "20px" }}>Jogar agora →</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
