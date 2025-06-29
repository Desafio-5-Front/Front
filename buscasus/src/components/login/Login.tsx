import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logoImage from "../../images/icon.png";
import axios from "axios"; // Importa o Axios

interface LoginState {
  email: string;
  senha: string;
  error: string;
  showPassword: boolean;
}

interface LoginProps {
  onClose: () => void;
  onCadastroClick: () => void;
  onEsqueciSenhaClick: () => void;
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onCadastroClick, onEsqueciSenhaClick, onLoginSuccess }) => {
  const [state, setState] = useState<LoginState>({
    email: "",
    senha: "",
    error: "",
    showPassword: false,
  });

  const handleLogin = async () => {
    setState((prev) => ({ ...prev, error: "" })); // Limpa erros anteriores

    if (!state.email || !state.senha) {
      setState((prev) => ({ ...prev, error: "Por favor, preencha e-mail e senha." }));
      return;
    }

    try {
      const response = await axios.post("https://desafio-05-api.onrender.com/api/auth/login", {
        email: state.email,
        password: state.senha, // O backend espera 'password', não 'senha'
      });

      // Login bem-sucedido: Armazene o token JWT e marque como logado
      localStorage.setItem("authToken", response.data.token); // Supondo que o token venha em 'response.data.token'
      localStorage.setItem("isLoggedIn", "true"); // Flag para controle de rota protegida no frontend
      setState((prev) => ({ ...prev, error: "" })); // Limpa qualquer erro após o sucesso
      onLoginSuccess(); // Notifica o App.tsx para fechar o modal e navegar
    } catch (error: unknown) { // Use 'unknown' para errors no catch
      console.error("Erro ao tentar login:", error);

      if (axios.isAxiosError(error)) { // Verifica se é um erro gerado pelo Axios
        if (error.response) { // Verifica se há uma resposta do servidor (ex: status 4xx, 5xx)
          const axiosResponseData = error.response.data; // Variável auxiliar para o TypeScript
          setState((prev) => ({ ...prev, error: axiosResponseData.message || "Credenciais inválidas." }));
        } else if (error.request) { // A requisição foi feita, mas não houve resposta (erro de rede, CORS, etc.)
          setState((prev) => ({ ...prev, error: "Sem resposta do servidor. Verifique sua conexão ou o CORS." }));
          console.error("Erro na requisição Axios (sem resposta):", error.request);
        } else { // Algum outro erro ao configurar a requisição
          setState((prev) => ({ ...prev, error: "Erro ao configurar a requisição. Tente novamente." }));
          console.error("Erro na configuração da requisição Axios:", error.message);
        }
      } else { // Erro não relacionado ao Axios (ex: erro de programação)
        setState((prev) => ({ ...prev, error: "Ocorreu um erro inesperado. Tente novamente." }));
        console.error("Erro inesperado:", error);
      }
    }
  };

  // NOVO: Função para autenticação via Google
  const handleGoogleLogin = () => {
    // Redireciona o navegador para o endpoint de autenticação do Google no backend
    // O backend será responsável por redirecionar para o Google e depois de volta ao frontend
    window.location.href = "https://desafio-05-api.onrender.com/api/auth/google";
  };

  // NOVO: Função para autenticação via GitHub
  const handleGitHubLogin = () => {
    window.location.href = "https://desafio-05-api.onrender.com/api/auth/github";
  };

  return (
    <div className="login-container" onClick={(e) => e.stopPropagation()} >
      <div className="login-box" >
        <button className="back-button" onClick={onClose}>
          &larr;
        </button>
        <div className="login-header-container">
          <img src={logoImage} alt="ConectaSUS Logo" className="login-logo" />
        </div>
        <form className=" form-container">
          <h2 className="login-header">Login</h2>
          <input
            type="email"
            value={state.email}
            onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
            className="login-input"
            placeholder="Email"
          />
          <div className="password-container">
            <input
              type={state.showPassword ? "text" : "password"}
              value={state.senha}
              onChange={(e) => setState((prev) => ({ ...prev, senha: e.target.value }))}
              className="login-input"
              placeholder="Senha"
            />
            <Link
              to="/esqueci-senha"
              className="forgot-password"
              onClick={(e) => { e.preventDefault(); onEsqueciSenhaClick(); }}
            >
              Esqueceu a senha?
            </Link>
            <span
              className="toggle-password"
              onClick={() => setState((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
            >
              {state.showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          {state.error && <p className="error">{state.error}</p>}
          <button type="button" className="login-button" onClick={handleLogin}>
            Entrar
          </button>
          <div className="social-login-buttons">
            <button type="button" className="login-button google-login-button" onClick={handleGoogleLogin}>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google Icon"
                className="icon"
              />
              Entrar com Google
            </button>
            {/* NOVO: Botão para login com GitHub */}
            <button type="button" className="login-button github-login-button" onClick={handleGitHubLogin}>
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub Icon"
                className="icon"
              />
              Entrar com GitHub
            </button>
          </div>
          <p className="login-link">
            Não tem uma conta?
            <button type="button" className="login-link-bold" onClick={(e) => { e.stopPropagation(); onCadastroClick(); }}>Cadastre-se</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;