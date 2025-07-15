import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import HealthUnitsSearch from '../components/HealthUnitsSearch/HealthUnitsSearch';

export default function Home() {
  const [showConsulta, setShowConsulta] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
    setMenuOpen(false);
  };

  return (
    <>
      <Head>
        <title>BuscaSUS - Acesse informações relevantes de saúde</title>
        <meta name="description" content="O BuscaSUS é um portal digital que facilita o acesso aos serviços do SUS. Consulte vacinação, exames, atendimentos e encontre unidades de saúde de forma simples, rápida e integrada." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="app">
        <header className="header">
          <div className="container">
            <div className="logo">
              <Image src="/images/icon2.png" alt="BuscaSUS Logo" width={70} height={70} />
            </div>
            <button className="menu-toggle" onClick={toggleMenu}>
              ☰
            </button>
            <nav className={`nav ${menuOpen ? "open" : ""}`}>
              <button className="nav-link" onClick={() => scrollToSection('hero-section')}>Home</button>
              <button className="nav-link" onClick={() => scrollToSection('about-section')}>Sobre</button>
              <button className="nav-link" onClick={() => scrollToSection('contact-footer')}>Contato</button>
            </nav>
          </div>
        </header>

        <section id="hero-section" className="hero" style={{ height: "700px" }}>
          <div className="hero-background" style={{ backgroundImage: `url(/images/home.png)` }}></div>
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
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about-section" className="about">
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
                  <Image src="/images/lupa.png" alt="Ícone de lupa - Dados de saúde" className="feature-image" width={120} height={100} />
                </div>
                <div className="feature-content">
                  <h2 className="feature-title">Conheça dados importantes de saúde</h2>
                  <p className="feature-description">
                    Acesse seu prontuário, resultados de exames e vacinas registradas em um só lugar.
                  </p>
                  <button className="feature-button">
                    Em breve →
                  </button>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-image-container">
                  <Image src="/images/medic.png" alt="Ícone de localização" className="feature-image" width={120} height={100} />
                </div>
                <div className="feature-content">
                  <h2 className="feature-title">Veja a unidade mais próxima</h2>
                  <p className="feature-description">
                    Encontre facilmente postos, clínicas e hospitais do SUS pelo mapa interativo.
                  </p>
                  <button className="feature-button" onClick={() => setShowConsulta(true)}>
                    Clique aqui →
                  </button>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-image-container">
                  <Image src="/images/paper.png" alt="Ícone de informações" className="feature-image" width={120} height={100} />
                </div>
                <div className="feature-content">
                  <h2 className="feature-title">Informações de saúde</h2>
                  <p className="feature-description">
                    Acesse informações importantes sobre saúde pública e serviços disponíveis.
                  </p>
                  <button className="feature-button">
                    Em breve →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="footer">
          <footer id="contact-footer" className="footer">
            <div className="footer-logos">
              <Image src="/images/inova.png" alt="Logo INOVA" className="footer-logo" width={60} height={50} />
              <Image src="/images/icon2.png" alt="Logo Governo" className="footer-logo" width={60} height={50} />
              <Image src="/images/secti.png" alt="Logo SECTI" className="footer-logo" width={60} height={50} />
            </div>
            <div className="footer-contact">Contato: buscasusgp2@gmail.com</div>
          </footer>
        </section>

        {showConsulta && (
          <div className="modal-overlay" onClick={() => setShowConsulta(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden', zIndex: 1000 }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxHeight: '100vh', overflowY: 'auto' }}>
              <HealthUnitsSearch onClose={() => setShowConsulta(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}