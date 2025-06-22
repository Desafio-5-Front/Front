
import React from "react"; // Importa o tipo React para tipagem
import "./App.css"; // Importa o arquivo CSS global
import homeImage from "./images/home.png"; // Importa a imagem de fundo
import iconImage from "./images/icon.png"; // Importa o ícone do logo
import { Route, Routes, Navigate, Link, useNavigate, useLocation } from "react-router-dom"; // Importa apenas o necessário
import Login from "./components/login/Login"; // Importa Login
import Cadastro from "./components/cadastro/Cadastro"; // Importa Cadastro
import EsqueciSenha from "./components/login/EsqueciSenha";
import RedefinirSenha from "./components/login/RedefinirSenha";
import Jogar from "./jogar/Jogar"

// Interface para props de componentes genéricos
interface BaseProps {
  children?: React.ReactNode;
}

// Componente ProtectedRoute (usado em rotas)
const ProtectedRoute: React.FC<BaseProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  console.log("ProtectedRoute - isLoggedIn:", isLoggedIn); // Depuração
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

// Componentes Placeholder
const Home: React.FC = () => <></>;
const Sobre: React.FC = () => <h1>Sobre</h1>;
const Contato: React.FC = () => <h1>Contato</h1>;
//const Jogar: React.FC = () => <></>;

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = React.useState(false);
  const [showCadastro, setShowCadastro] = React.useState(false);
  const [showEsqueciSenha, setShowEsqueciSenha] = React.useState(false);
  const [showRedefinirSenha, setShowRedefinirSenha] = React.useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);

  };

  const handleJogarClick = () => {
    // Se o usuário não estiver logado, abra o modal de login
    if (localStorage.getItem("isLoggedIn") !== "true") {
      setShowLogin(true);
    } else {
      // Se já estiver logado, navegue diretamente para /jogar
      navigate("/jogar");
    }
  };

  const handleCadastroClick = () => {
    setShowLogin(false);
    setShowCadastro(true);
  }

  const handleEsqueciSenhaClick = () => { // [Mudança] Nova função
    setShowLogin(false); // Fecha o modal de login
    setShowEsqueciSenha(true); // Abre o modal de "Esqueceu a senha"
  };

  const handleRedefinirSenhaClick = () => { // [Mudança] Nova função
    setShowEsqueciSenha(false); // Fecha o modal de "Esqueceu a senha"
    setShowRedefinirSenha(true); // Abre o modal de "Redefinir Senha"
  };

  const handleGoToLogin = () => {
    setShowCadastro(false); // Fecha o modal de cadastro
    setShowEsqueciSenha(false);
    setShowRedefinirSenha(false);
    setShowLogin(true);    // Abre o modal de login
  };

  // **NOVA FUNÇÃO AQUI:** Centraliza a lógica de sucesso de login
  const handleLoginSuccess = () => {
    setShowLogin(false); // Fecha o modal de login
    navigate("/jogar", { replace: true }); // Redireciona para a página "Jogar"
  };

  // Verifica se a rota atual é a homepage
  const isHomePage = location.pathname === "/";
  // Verifica se a rota atual é a página de jogo
  const isJogarPage = location.pathname === "/jogar";

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src={iconImage} alt="ConectaSUS Logo" />
          </div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/sobre">Sobre</Link>
            <button className="nav-link" onClick={handleLoginClick}>Login</button> {/* Substitui Link por botão */}
            <Link to="/contato">Contato</Link>
          </nav>
        </div>
      </header>
      {isHomePage && (
        <>
          <section className="hero" style={{ height: "700px" }}>
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
                    <button className="btn" style={{ marginTop: "-300px" }}>
                      <Link to="/unidades">Consultar unidades →</Link>
                    </button>
                    <button className="btn" style={{ marginTop: "20px" }}>
                      <Link to="/dashboard">Dashboard →</Link>
                    </button>
                    <button className="btn" style={{ marginTop: "20px" }} onClick={handleJogarClick}>
                      Jogar agora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="about">
            <div className="container">
              <h2 className="about-title">Sobre o projeto</h2>
              <p className="about-description">
                O ConectaSUS é a sua porta de entrada para uma saúde pública mais acessível e transparente. Descubra nossos
                serviços e experimente uma nova forma de gerenciar seu cuidado com agilidade e confiança.
              </p>
              <div className="about-box">
                <p className="about-box-text">
                  No ConectaSUS, cada detalhe foi pensado para você. Aqui, a tecnologia anda de mãos dadas com o cuidado:
                  facilitamos o acesso à informação, aos serviços de saúde e ao seu histórico, porque acreditamos que estar
                  bem informado é o primeiro passo para ser bem cuidado.
                </p>
              </div>
            </div>
          </section>
          <section className="features">
            <div className="container">
              <h1 className="features-main-title">Conheças as funcionalidades</h1>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-image-container">
                    <img
                      src={require("./images/lupa.png")}
                      alt="Ícone de lupa - Dados de saúde"
                      className="feature-image"
                    />
                  </div>
                  <div className="feature-content">
                    <h2 className="feature-title">Conheça dados importantes de saúde</h2>
                    <p className="feature-description">
                      Acesse seu prontuário, resultados de exames e vacinas registradas em um só lugar.
                    </p>
                    <button className="feature-button">
                      <Link to="/dados-saude">Clique aqui →</Link>
                    </button>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-image-container">
                    <img
                      src={require("./images/medic.png")}
                      alt="Ícone de localização"
                      className="feature-image"
                    />
                  </div>
                  <div className="feature-content">
                    <h2 className="feature-title">Veja a unidade mais próxima</h2>
                    <p className="feature-description">
                      Encontre facilmente postos, clínicas e hospitais do SUS pelo mapa interativo.
                    </p>
                    <button className="feature-button">
                      <Link to="/unidades-proximas">Clique aqui →</Link>
                    </button>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-image-container">
                    <img
                      src={require("./images/paper.png")}
                      alt="Ícone de jogo"
                      className="feature-image"
                    />
                  </div>
                  <div className="feature-content">
                    <h2 className="feature-title">Aprenda enquanto joga</h2>
                    <p className="feature-description">
                      Conheça nosso jogo sobre saúde e transforme conhecimento em prática de forma divertida.
                    </p>
                    <button className="feature-button">
                      <Link to="/jogar">Clique aqui →</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <div className="modal-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/esqueci-senha" element={<h1>Recuperação de Senha</h1>} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/jogar" element={<ProtectedRoute><Jogar /></ProtectedRoute>} />
          <Route path="/unidades" element={<h1>Consultar Unidades</h1>} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/dados-saude" element={<h1>Dados de Saúde</h1>} />
          <Route path="/unidades-proximas" element={<h1>Unidades Próximas</h1>} />
        </Routes>
      </div>
      <footer className="footer">
        <div className="footer-logos">
          <img src={require("./images/inova.png")} alt="Logo INOVA" className="footer-logo" />
          <img src={require("./images/icon2.png")} alt="Logo Governo" className="footer-logo" />
          <img src={require("./images/secti.png")} alt="Logo SECTI" className="footer-logo" />
        </div>
        <div className="footer-contact">Contato: conectasusgp2@gmail.com</div>
      </footer>
      {/* Wrapper para modais */}
      
      {showLogin && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setShowLogin(false)
        }}>
          <Login
            onClose={() => setShowLogin(false)}
            onCadastroClick={handleCadastroClick}
            onEsqueciSenhaClick={handleEsqueciSenhaClick}
            onLoginSuccess={handleLoginSuccess} />
        </div>
      )}
      {showCadastro && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setShowCadastro(false);
        }}>
          <Cadastro
            onClose={() => setShowCadastro(false)}
            onLoginClick={handleGoToLogin} />
        </div>
      )}
      {showEsqueciSenha && ( // [Mudança] Novo modal
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setShowEsqueciSenha(false);
        }}>
          <EsqueciSenha
            onClose={() => setShowEsqueciSenha(false)}
            onLoginClick={handleGoToLogin}
            onRedefinirSenhaClick={handleRedefinirSenhaClick} />
        </div>
      )}
      {showRedefinirSenha && ( // [Mudança] Novo modal
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setShowRedefinirSenha(false);
        }}>
          <RedefinirSenha
            onClose={() => setShowRedefinirSenha(false)}
            onLoginClick={handleGoToLogin} />
        </div>
      )}
    </div>
  );
};

export default App;
