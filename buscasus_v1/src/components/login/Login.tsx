import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import logoImage from "../../images/icon2.png";


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

  
  const handleLogin = () => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedSenha = localStorage.getItem("userSenha");

    if (!storedEmail || !storedSenha) {
      setState((prev) => ({ ...prev, error: "Nenhum usuário cadastrado. Use 'Cadastrar-se'." }));
      return;
    }

    if (state.email === storedEmail && state.senha === storedSenha) {
      localStorage.setItem("isLoggedIn", "true");
      setState((prev) => ({ ...prev, error: "" }));
      onLoginSuccess();
    } else {
      setState((prev) => ({ ...prev, error: "E-mail ou senha inválidos." }));
    }
  };

  return (
    <div className="login-container" onClick={(e) => e.stopPropagation} >

      <div className="login-box" >
        <button className="back-button" onClick={onClose}>
          &larr;
        </button>
        <div className="login-header-container">
          <img src={logoImage} alt="BuscaSUS Logo" className="login-logo" />
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
            <span
              className="toggle-password"
              onClick={() => setState((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
            >
              {state.showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
            <Link
              to="/esqueci-senha"
              className="forgot-password"
              onClick={(e) => { e.preventDefault(); onEsqueciSenhaClick(); }}
            >
              Esqueceu a senha?
            </Link>
          {state.error && <p className="error">{state.error}</p>}
          <button type="button" className="login-button" onClick={handleLogin}>
            Entrar
          </button>
          <p className="login-link">
            Não tem uma conta?
            <button className="login-link-bold" onClick={(e) => { e.stopPropagation(); onCadastroClick(); }}>Cadastre-se</button>

          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;