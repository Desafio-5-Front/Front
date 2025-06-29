import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import logoImage from "../../images/icon.png";
import axios from "axios"; // Importa o Axios

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
  const location = useLocation();

  const [token, setToken] = useState<string | null>(null);

  // useEffect para extrair o token da URL quando o componente monta
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
      // console.log("Token de redefinição encontrado na URL:", urlToken); // Para depuração
    } else {
      // Se não houver token na URL, exibe erro e opcionalmente redireciona
      setState((prev) => ({ ...prev, error: "Token de redefinição de senha não encontrado na URL. Por favor, use o link do e-mail." }));
      // Opcional: redirecionar se não houver token válido na URL, após um tempo
      // setTimeout(() => navigate("/"), 3000);
    }
  }, [location.search, navigate]); // Dependências: re-executar se a parte da busca da URL mudar ou o navigate mudar

  const handleSubmit = async () => {
    setState((prev) => ({ ...prev, error: "", success: "" })); // Limpa mensagens anteriores

    if (!state.senha || !state.confirmSenha) {
      setState((prev) => ({ ...prev, error: "Ambos os campos são obrigatórios." }));
      return;
    }
    if (state.senha !== state.confirmSenha) {
      setState((prev) => ({ ...prev, error: "As senhas não coincidem." }));
      return;
    }
    if (!token) { // Verifica se o token foi realmente extraído
      setState((prev) => ({ ...prev, error: "Token de redefinição inválido ou ausente." }));
      return;
    }

    try {
      // Endpoint para redefinição de senha
      const response = await axios.post("https://desafio-05-api.onrender.com/api/auth/reset-password", {
        token: token,
        password: state.senha, // O backend espera 'password'
      });

      setState((prev) => ({ ...prev, success: response.data.message || "Senha redefinida com sucesso!" }));
      // Após a redefinição, redireciona para a tela de login
      setTimeout(() => {
        onClose(); // Fecha o modal de redefinição
        onLoginClick(); // Abre o modal de login para o usuário entrar com a nova senha
      }, 2000); // Dá um tempo para o usuário ler a mensagem de sucesso

    } catch (error: unknown) { // Use 'unknown' para errors no catch
      console.error("Erro ao redefinir senha:", error);

      if (axios.isAxiosError(error)) { // Verifica se é um erro gerado pelo Axios
        if (error.response) { // Verifica se há uma resposta do servidor (ex: status 4xx, 5xx)
          const axiosResponseData = error.response.data; // Variável auxiliar para o TypeScript
          setState((prev) => ({ ...prev, error: axiosResponseData.message || "Erro ao redefinir a senha." }));
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
            <button type="button" className="login-link-bold" onClick={onLoginClick}>Voltar ao Login</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RedefinirSenha;