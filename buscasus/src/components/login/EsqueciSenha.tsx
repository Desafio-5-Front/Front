import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Reutiliza o CSS unificado
import logoImage from "../../images/icon.png";

interface EsqueciSenhaState {
  email: string;
  error: string;
}

interface EsqueciSenhaProps {
  onClose: () => void;
  onLoginClick: () => void;
  onRedefinirSenhaClick: () => void;
}

const EsqueciSenha: React.FC<EsqueciSenhaProps> = ({ onClose, onLoginClick, onRedefinirSenhaClick }) => {
  const [state, setState] = useState<EsqueciSenhaState>({
    email: "",
    error: "",
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    // Simulação de envio de e-mail (substitua por lógica real de backend)
    if (!state.email) {
      setState((prev) => ({ ...prev, error: "Por favor, insira seu e-mail." }));
      return;
    }
    setState((prev) => ({ ...prev, error: "Um e-mail de recuperação foi enviado, verifique sua caixa de entrada." }));
    setTimeout(() => {
        setState((prev) => ({ ...prev, error: "" })); // Limpa a mensagem
        onClose();
        onRedefinirSenhaClick();
    }, 2000);
  };

  return (
    <div className="login-container" onClick={(e) => e.stopPropagation()}>
      <div className="login-box">
        <button className="back-button" onClick={onClose}>
          ←
        </button>
        <div className="login-header-container">
          <img src={logoImage} alt="ConectaSUS Logo" className="login-logo" />
        </div>
        <form className="form-container">
          <h2 className="login-header">Esqueceu a Senha?</h2>
          <input
            type="email"
            value={state.email}
            onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
            className="login-input"
            placeholder="E-mail"
          />
          {state.error && <p className="error">{state.error}</p>}
          <button type="button" className="login-button" onClick={handleSubmit}>
            Enviar
          </button>
          <p className="login-link">
            Lembrou a senha? <button className="login-link-bold" onClick={onLoginClick}>Voltar ao Login</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EsqueciSenha;