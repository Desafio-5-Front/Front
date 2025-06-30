import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logoImage from "../../images/icon2.png";
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          display: 'flex',
          width: '1006px',
          height: '556px',
          background: 'white',
          borderRadius: '29px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          margin: '191px 201px 210px 224px',
          gap: '70px',
          paddingTop: '30px'
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: '50px',
            left: '210px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#000',
            padding: '5px'
          }}
          onClick={onClose}
        >
          &larr;
        </button>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img
            src={logoImage}
            alt="BuscaSUS Logo"
            style={{
              width: '398px',
              height: '398px',
              marginRight: '20px'
            }}
          />
        </div>

        <form
          style={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            width: '398px',
            height: '500px',
            alignItems: 'center',
            margin: '10px',
            gap: '20px',
            marginTop: '10px',
            marginLeft: '50px'
          }}
        >
          <h2
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: '800',
              fontSize: '30px',
              color: '#000000',
              paddingTop: '-50px'
            }}
          >
            Login
          </h2>

          <input
            type="email"
            value={state.email}
            onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
            style={{
              width: '327px',
              height: '50px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontFamily: '"Inter", sans-serif',
              marginTop: '20px',
              padding: '20px'
            }}
            placeholder="Email"
          />

          <div style={{ position: 'relative' }}>
            <input
              type={state.showPassword ? "text" : "password"}
              value={state.senha}
              onChange={(e) => setState((prev) => ({ ...prev, senha: e.target.value }))}
              style={{
                width: '327px',
                height: '50px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '20px',
                fontFamily: '"Inter", sans-serif',
              }}
              placeholder="Senha"
            />
            <span
              style={{
                position: 'absolute',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                paddingRight: '-200px',
                paddingTop: '50px',
                left: '290px'
              }}
              onClick={() => setState((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
            >
              {state.showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <Link
            to="/esqueci-senha"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: '400',
              fontSize: '11px',
              color: '#000000',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '-10px',
              marginBottom: '10px'
            }}
            onClick={(e) => { e.preventDefault(); onEsqueciSenhaClick(); }}
          >
            Esqueceu a senha?
          </Link>

          {state.error && <p style={{ color: 'red' }}>{state.error}</p>}

          <button
            type="button"
            style={{
              width: '327px',
              height: '38px',
              backgroundColor: '#689CFF',
              color: '#FFFFFF',
              fontFamily: '"Inter", sans-serif',
              fontWeight: '600',
              fontSize: '18px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={handleLogin}
          >
            Entrar
          </button>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '15px'
          }}>
            <button
              type="button"
              style={{
                width: '327px',
                height: '38px',
                backgroundColor: '#ffffff',
                color: '#202124',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '600',
                fontSize: '18px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
              }}
              onClick={handleGoogleLogin}
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google Icon"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '30px'
                }}
              />
              Entrar com Google
            </button>

            <button
              type="button"
              style={{
                width: '327px',
                height: '38px',
                backgroundColor: '#333',
                color: 'white',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '600',
                fontSize: '18px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
              }}
              onClick={handleGitHubLogin}
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub Icon"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '30px'
                }}
              />
              Entrar com GitHub
            </button>
          </div>

          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: '400',
            fontSize: '16px',
            color: '#000000',
            textAlign: 'center'
          }}>
            Não tem uma conta?
            <button
              type="button"
              style={{
                fontWeight: '700',
                textDecoration: 'underline',
                color: '#000000',
                border: 'none',
                fontSize: '16px',
                fontFamily: '"Inter", sans-serif',
                background: 'none',
                cursor: 'pointer',
                padding: '0',
                marginLeft: '5px'
              }}
              onClick={(e) => { e.stopPropagation(); onCadastroClick(); }}
            >
              Cadastre-se
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;