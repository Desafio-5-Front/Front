import React, { useState } from "react";
// Removido useNavigate, não está sendo usado diretamente no componente EsqueciSenha
import "./Login.css"; // Reutiliza o CSS unificado
import logoImage from "../../images/icon.png";
import axios from "axios"; // Importa o Axios

interface EsqueciSenhaState {
  email: string;
  error: string;
  message: string; // Adicionado para mensagens de sucesso/info
}

interface EsqueciSenhaProps {
  onClose: () => void;
  onLoginClick: () => void;
  onRedefinirSenhaClick: () => void; // Mantido, embora o fluxo possa levar de volta ao Login
}

const EsqueciSenha: React.FC<EsqueciSenhaProps> = ({ onClose, onLoginClick, onRedefinirSenhaClick }) => {
  const [state, setState] = useState<EsqueciSenhaState>({
    email: "",
    error: "",
    message: "",
  });

  const handleSubmit = async () => {
    setState((prev) => ({ ...prev, error: "", message: "" })); // Limpa mensagens anteriores

    if (!state.email) {
      setState((prev) => ({ ...prev, error: "Por favor, insira seu e-mail." }));
      return;
    }

    try {
      const response = await axios.post("https://desafio-05-api.onrender.com/api/auth/forgot-password", {
        email: state.email,
      });

      setState((prev) => ({ ...prev, message: response.data.message || "Um e-mail de recuperação foi enviado, verifique sua caixa de entrada." }));
      // Após enviar o e-mail, fecha o modal e volta para a tela de login
      setTimeout(() => {
        onClose(); // Fecha o modal de "Esqueci a senha"
        onLoginClick(); // Abre o modal de login (para o usuário inserir a nova senha após receber o email)
      }, 3000); // Tempo para o usuário ler a mensagem

    } catch (error: unknown) { // Use 'unknown' para errors no catch
      console.error("Erro ao enviar solicitação de recuperação de senha:", error);

      if (axios.isAxiosError(error)) { // Verifica se é um erro gerado pelo Axios
        if (error.response) { // Verifica se há uma resposta do servidor
          const axiosResponseData = error.response.data; // Variável auxiliar para o TypeScript
          setState((prev) => ({ ...prev, error: axiosResponseData.message || "Erro ao enviar e-mail de recuperação." }));
        } else if (error.request) { // A requisição foi feita, mas não houve resposta
          setState((prev) => ({ ...prev, error: "Sem resposta do servidor. Verifique sua conexão ou o CORS." }));
          console.error("Erro na requisição Axios (sem resposta):", error.request);
        } else { // Algum outro erro ao configurar a requisição
          setState((prev) => ({ ...prev, error: "Erro ao configurar a requisição. Tente novamente." }));
          console.error("Erro na configuração da requisição Axios:", error.message);
        }
      } else { // Erro não relacionado ao Axios
        setState((prev) => ({ ...prev, error: "Ocorreu um erro inesperado. Tente novamente." }));
        console.error("Erro inesperado:", error);
      }
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
          <h2 className="login-header">Esqueceu a Senha?</h2>
          <input
            type="email"
            value={state.email}
            onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
            className="login-input"
            placeholder="E-mail"
          />
          {state.error && <p className="error">{state.error}</p>}
          {state.message && <p style={{ color: "green" }}>{state.message}</p>} {/* Exibe a mensagem de sucesso */}
          <button type="button" className="login-button" onClick={handleSubmit}>
            Enviar
          </button>
          <p className="login-link">
            Lembrou a senha? <button type="button" className="login-link-bold" onClick={onLoginClick}>Voltar ao Login</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EsqueciSenha;