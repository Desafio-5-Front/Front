import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logoImage from "../../images/icon.png";

interface RedefinirSenhaState {
  senha: string;
  confirmSenha: string;
  error: string;
  success: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

interface RedefinirSenhaProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const RedefinirSenha: React.FC<RedefinirSenhaProps> = ({ onClose, onLoginClick }) => {
  const [state, setState] = useState<RedefinirSenhaState>({
    senha: "",
    confirmSenha: "",
    error: "",
    success: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!state.senha || !state.confirmSenha) {
      setState((prev) => ({ ...prev, error: "Ambos os campos são obrigatórios." }));
      return;
    }
    if (state.senha !== state.confirmSenha) {
      setState((prev) => ({ ...prev, error: "As senhas não coincidem." }));
      return;
    }
    // Simulação de atualização de senha
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      localStorage.setItem("userSenha", state.senha);
      setState((prev) => ({ ...prev, success: "Senha redefinida com sucesso!", error: "" }));
      setTimeout(() => {
        onClose();
        navigate("/login");
      }, 2000);
    } else {
      setState((prev) => ({ ...prev, error: "Nenhum usuário encontrado." }));
    }
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
          <h2 className="login-header">Redefinir Senha</h2>
          {state.error && <p className="error">{state.error}</p>}
          {state.success && <p style={{ color: "green" }}>{state.success}</p>}
          <div className="password-container">
            <input
              type={state.showPassword ? "text" : "password"}
              value={state.senha}
              onChange={(e) => setState((prev) => ({ ...prev, senha: e.target.value }))}
              className="login-input"
              placeholder="Nova Senha"
            />
            <span
              className="toggle-password"
              onClick={() => setState((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
            >
              {state.showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
          <div className="password-container">
            <input
              type={state.showConfirmPassword ? "text" : "password"}
              value={state.confirmSenha}
              onChange={(e) => setState((prev) => ({ ...prev, confirmSenha: e.target.value }))}
              className="login-input"
              placeholder="Confirmar Nova Senha"
            />
            <span
              className="toggle-password"
              onClick={() => setState((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
            >
              {state.showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
          <button type="button" className="login-button" onClick={handleSubmit}>
            Salvar Nova Senha
          </button>
          <p className="login-link">
            <button className="login-link-bold" onClick={onLoginClick}>Voltar ao Login</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RedefinirSenha;