import React from "react";
import { useEffect } from "react"
import "./App.css";
import homeImage from "./images/home.png";
import iconImage from "./images/icon2.png";
import { Route, Routes, Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import Login from "./components/login/Login";
import Cadastro from "./components/cadastro/Cadastro";
import EsqueciSenha from "./components/login/EsqueciSenha";
import RedefinirSenha from "./components/login/RedefinirSenha";
import Jogar from "./jogar/Jogar"
interface BaseProps {children?: React.ReactNode;}
const ProtectedRoute: React.FC<BaseProps> = ({ children }) => {const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";console.log("ProtectedRoute - isLoggedIn:", isLoggedIn);return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;};
const App: React.FC = () => {
  const router = useNavigate();
  const navigate = useNavigate();
  const location = useLocation();
  const [showConsulta, setShowConsulta] = React.useState(false);
  const [showMap, setShowMap] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<number | null>(null);
  const [showLogin, setShowLogin] = React.useState(false);
  const [showCadastro, setShowCadastro] = React.useState(false);
  const [showEsqueciSenha, setShowEsqueciSenha] = React.useState(false);
  const [showRedefinirSenha, setShowRedefinirSenha] = React.useState(false);
  useEffect(() => {if (showConsulta) {const scrollY = window.scrollY;document.body.style.position = 'fixed';document.body.style.top = `-${scrollY}px`;document.body.style.width = '100%';return () => {const scrollY = document.body.style.top;document.body.style.position = '';document.body.style.top = '';window.scrollTo(0, parseInt(scrollY || '0') * -1);};}}, [showConsulta]);
  useEffect(() => {console.log("Rota atual:", location.pathname)}, [location])
  const handleLoginClick = () => {setShowLogin(true);};
  const handleJogarClick = () => {if (localStorage.getItem("isLoggedIn") !== "true") {setShowLogin(true);} else {navigate("/jogar");}};
  const handleCadastroClick = () => {setShowLogin(false);setShowCadastro(true);}
  const handleEsqueciSenhaClick = () => {setShowLogin(false);setShowEsqueciSenha(true);};
  const handleRedefinirSenhaClick = () => {setShowEsqueciSenha(false);setShowRedefinirSenha(true);};
  const handleGoToLogin = () => {setShowCadastro(false);setShowEsqueciSenha(false);setShowRedefinirSenha(false);setShowLogin(true);};
  const handleLoginSuccess = () => {setShowLogin(false); navigate("/jogar", { replace: true });};
  const isHomePage = location.pathname === "/";
  return (
    <div className="app" style={{ zIndex: 1000 }}>
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src={iconImage} alt="BuscaSUS Logo" />
          </div>
          <nav className="nav">
            <button className="nav-link" onClick={handleLoginClick}>Login</button>
          </nav>
        </div>
      </header>
      {isHomePage && (<>
          <section className="hero" style={{ height: "700px" }}>
            <div className="hero-background" style={{ backgroundImage: `url(${homeImage})` }}></div>
            <div className="container">
              <div className="hero-content">
                <div className="hero-left">
                  <h1 className="hero-title">BuscaSUS</h1>
                  <h2 className="hero-subtitle">Acesse informações relevantes de saúde</h2>
                  <p className="hero-description">
                    O BuscaSUS é um portal digital que facilita o acesso aos serviços do SUS. Consulte vacinação, exames,
                    atendimentos e encontre unidades de saúde de forma simples, rápida e integrada.
                  </p>
                  <div className="hero-buttons">
                    <button className="btn" style={{ marginTop: "-300px" }} onClick={() => setShowConsulta(true)}>
                      Consultar unidades →
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
                O BuscaSUS é a sua porta de entrada para uma saúde pública mais acessível e transparente. Descubra nossos
                serviços e experimente uma nova forma de gerenciar seu cuidado com agilidade e confiança.
              </p>
              <div className="about-box">
                <p className="about-box-text">
                  Cada detalhe foi pensado para você. Aqui, a tecnologia anda de mãos dadas com o cuidado:
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
                    <img src={require("./images/lupa.png")} alt="Ícone de lupa - Dados de saúde" className="feature-image" />
                  </div>
                  <div className="feature-content">
                    <h2 className="feature-title">Conheça dados importantes de saúde</h2>
                    <p className="feature-description">
                      Acesse seu prontuário, resultados de exames e vacinas registradas em um só lugar.
                    </p>
                    <button className="feature-button">
                      <Link to="/dados-saude" style={{ textDecoration: "none", color: "white" }}>Clique aqui →</Link>
                    </button>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-image-container">
                    <img src={require("./images/medic.png")} alt="Ícone de localização" className="feature-image" />
                  </div>
                  <div className="feature-content">
                    <h2 className="feature-title">Veja a unidade mais próxima</h2>
                    <p className="feature-description">
                      Encontre facilmente postos, clínicas e hospitais do SUS pelo mapa interativo.
                    </p>
                    <button className="feature-button">
                      <Link to="/unidades-proximas" style={{ textDecoration: "none", color: "white" }}>Clique aqui →</Link>
                    </button>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-image-container">
                    <img src={require("./images/paper.png")} alt="Ícone de jogo" className="feature-image" />
                  </div>
                  <div className="feature-content">
                    <h2 className="feature-title">Aprenda enquanto joga</h2>
                    <p className="feature-description">
                      Conheça nosso jogo sobre saúde e transforme conhecimento em prática de forma divertida.
                    </p>
                    <button className="feature-button">
                      <Link to="/jogar" style={{ textDecoration: "none", color: "white" }} onClick={handleJogarClick}>Clique aqui →</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="footer-section" >
            <footer className="footer">
              <div className="footer-logos">
                <img src={require("./images/inova.png")} alt="Logo INOVA" className="footer-logo" />
                <img src={require("./images/icon2.png")} alt="Logo Governo" className="footer-logo" />
                <img src={require("./images/secti.png")} alt="Logo SECTI" className="footer-logo" />
              </div>
              <div className="footer-contact">Contato: buscasusgp2@gmail.com</div>
            </footer>
          </section></>)}
      <div className="modal-wrapper">
        <Routes>
          <Route path="/esqueci-senha" element={<h1>Recuperação de Senha</h1>} />
          <Route path="/jogar" element={<ProtectedRoute><Jogar /></ProtectedRoute>} />
          <Route path="/dados-saude" element={<h1>Dados de Saúde</h1>} />
          <Route path="/unidades-proximas" element={<h1>Unidades Próximas</h1>} />
        </Routes>
      </div>
      {showLogin && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowLogin(false) }}>
          <Login onClose={() => setShowLogin(false)} onCadastroClick={handleCadastroClick} onEsqueciSenhaClick={handleEsqueciSenhaClick} onLoginSuccess={handleLoginSuccess} />
        </div>)}
      {showCadastro && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowCadastro(false); }}>
          <Cadastro onClose={() => setShowCadastro(false)} onLoginClick={handleGoToLogin} />
        </div>
      )}
      {showEsqueciSenha && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowEsqueciSenha(false); }}>
          <EsqueciSenha onClose={() => setShowEsqueciSenha(false)} onLoginClick={handleGoToLogin} onRedefinirSenhaClick={handleRedefinirSenhaClick} />
        </div>
      )}
      {showRedefinirSenha && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setShowRedefinirSenha(false);
        }}>
          <RedefinirSenha onClose={() => setShowRedefinirSenha(false)} onLoginClick={handleGoToLogin} />
        </div>
      )}
      {showConsulta && (
        <div className="modal-overlay" onClick={() => setShowConsulta(false)} style={{position: 'fixed',top: 0,left: 0,right: 0,bottom: 0,backgroundColor: 'rgba(0,0,0,0.5)',overflow: 'hidden',zIndex: 1000}}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '100%',maxHeight: '100vh',overflowY: 'auto',}}>
            <section className="consulta" style={{width: '100%',minHeight: '1200px',backgroundImage: `url(${require("./images/home.png")})`,backgroundSize: 'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',position: 'relative'}}>
              <div style={{position: 'absolute',top: 0,left: 0,width: '100%',minHeight: '1200px',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <button onClick={() => setShowConsulta(false)} style={{position: 'fixed',top: '20px',right: '20px',zIndex: 1001,padding: '10px 20px',backgroundColor: '#fff',border: 'none',borderRadius: '5px',cursor: 'pointer'}}>
                  Fechar
                </button>
                <div style={{padding: '50px',paddingTop: '100px',paddingLeft: '250px',opacity: 25}}>
                  <div style={{paddingLeft: "20px",width: "800px",height: "200px",backgroundColor: " rgba(255, 255, 255, 0.5)",borderRadius: "30px",padding: "20px",display: "flex",flexDirection: "column",gap: "15px",zIndex: 3000}}>
                    <div style={{ display: "flex", gap: "10px", position: "relative", paddingTop: "40px" }}>
                      <div style={{ flex: 1, position: "relative" }}>
                        <div onClick={() => setOpenDropdown(openDropdown === 1 ? null : 1)}style={{padding: "10px",backgroundColor: "white",color: "black",borderRadius: "20px",cursor: "pointer",textAlign: "center"}}>
                          Tipo
                        </div>
                        {openDropdown === 1 && (
                          <div style={{position: "absolute",top: "100%",left: 0,right: 0,backgroundColor: "#222",borderRadius: "4px",marginTop: "5px",zIndex: 100}}>
                            {["Clínica", "Hospital", "UPA"].map((opcao) => (
                              <div key={opcao}onClick={() => console.log("Selecionado:", opcao)}style={{padding: "8px",color: "white",cursor: "pointer",}}>
                                {opcao}
                              </div>))}
                          </div>)}
                      </div>
                      <div style={{ flex: 1, position: "relative" }}>
                        <div onClick={() => setOpenDropdown(openDropdown === 2 ? null : 2)}style={{padding: "10px",backgroundColor: "white",color: "black",borderRadius: "20px",cursor: "pointer",textAlign: "center"}}>
                          Bairro
                        </div>
                        {openDropdown === 2 && (
                          <div style={{position: "absolute",top: "100%",left: 0,right: 0,backgroundColor: "#222",borderRadius: "4px",marginTop: "5px",zIndex: 100}}>
                            {["Centro", "Vila Nova", "Jardins"].map((opcao) => (
                              <div key={opcao}onClick={() => console.log("Selecionado:", opcao)}style={{padding: "8px", color: "white",cursor: "pointer"}}>
                                {opcao}
                              </div>))}
                          </div>)}
                      </div>
                      <div style={{ flex: 1, position: "relative" }}>
                        <div onClick={() => setOpenDropdown(openDropdown === 3 ? null : 3)}style={{padding: "10px",backgroundColor: "white",color: "BLACK",borderRadius: "20px",cursor: "pointer",textAlign: "center"}}>
                          Serviço
                        </div>
                        {openDropdown === 3 && (
                          <div style={{position: "absolute",top: "100%",left: 0,right: 0,backgroundColor: "#222",borderRadius: "4px",marginTop: "5px",zIndex: 100}}>
                            {["Consulta", "Exames", "Emergência"].map((opcao) => (
                              <div key={opcao}onClick={() => console.log("Selecionado:", opcao)}style={{padding: "8px",color: "white",cursor: "pointer",}}>
                                {opcao}
                              </div>))}
                          </div>)}
                      </div>
                    </div>
                  </div>
                  <div style={{ height: '500px' }}></div>
                </div>
                {showMap && (
                  <div style={{position: "fixed",top: "110%",right: "50px",transform: "translateY(-50%)",backgroundColor: "white",height: "600px",width: "500px",borderRadius: "20px",zIndex: 1002,boxShadow: "0 0 20px rgba(0,0,0,0.5)"}}>
                    <button onClick={() => setShowMap(false)}style={{position: "absolute",top: "10px",left: "10px",zIndex: 1003,padding: "5px 10px",backgroundColor: "red",color: "white",border: "none",borderRadius: "5px",cursor: "pointer"}}>
                      Fechar
                    </button>
                    <div style={{height: "100%",width: "100%",display: "flex",justifyContent: "center",alignItems: "center",fontSize: "20px"}}>
                      Conteúdo do Mapa
                    </div>
                  </div>)}
                <div
                  style={{position: "absolute",top: "60%",left: "22%",transform: "translate(-50%, -50%)",backgroundColor: "white",height: "600px",width: "500px",padding: "10px",borderRadius: "20px",overflow: "hidden"}}>
                  <div style={{height: "100%",overflowY: "auto",scrollbarWidth: "none",msOverflowStyle: "none",paddingRight: "20px",marginRight: "-20px"}}>
                    {[...Array(15)].map((_, index) => (
                      <div key={index} style={{backgroundColor: "gray",padding: "15px",marginBottom: "10px",borderRadius: "6px",display: "flex",alignItems: "center"}}>
                        <div style={{ flex: 1 }}>
                          <p style={{ color: "white", margin: 0 }}>Sem dados</p>
                          <p style={{ color: "#aaa", margin: "5px 0 0 0" }}>Endereço: Sem dados</p>
                        </div>
        
                        <button onClick={() => setShowMap(true)}style={{backgroundColor: "#4285F4",color: "white",border: "none",padding: "8px 15px",borderRadius: "4px",cursor: "pointer"}}>
                          Maps
                        </button>
                      </div>))}
                  </div>
                </div>
              </div>
              <section className="footer-section" style={{top: "1200px", position: "relative"}}>	
                <footer className="footer">
                  <div className="footer-logos">
                    <img src={require("./images/inova.png")} alt="Logo INOVA" className="footer-logo" />
                    <img src={require("./images/icon2.png")} alt="Logo Governo" className="footer-logo" />
                    <img src={require("./images/secti.png")} alt="Logo SECTI" className="footer-logo" />
                  </div>
                  <div className="footer-contact">Contato: conectasusgp2@gmail.com</div>
                </footer>
              </section>
            </section>
          </div>
        </div>)}
    </div>);};
export default App;