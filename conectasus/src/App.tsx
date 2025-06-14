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
    </div>
  )
}

export default App
