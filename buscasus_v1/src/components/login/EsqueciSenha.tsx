import React, { useState } from "react";
// Removido useNavigate, não está sendo usado diretamente no componente EsqueciSenha
import "./Login.css"; // Reutiliza o CSS unificado
import logoImage from "../../images/icon2.png";
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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }} onClick={(e) => e.stopPropagation()}>
      <div style={{
        display: 'flex',
        width: '1006px',
        height: '556px',
        background: 'white',
        borderRadius: '29px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '191px 201px 210px 224px',
        gap: '70px',
        paddingTop: '30px'
      }}>
        <button style={{
          position: 'absolute',
          top: '10px',
          left: '1000px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#000',
          padding: '5px'
        }} onClick={onClose}>
          ←
        </button>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img src={logoImage} alt="ConectaSUS Logo" style={{
            width: '398px',
            height: '398px',
            marginRight: '20px'
          }} />
        </div>

        <form style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          width: '398px',
          height: '500px',
          alignItems: 'center',
          margin: '10px',
          gap: '20px',
          marginLeft: '50px',
          marginTop: '20px'
        }}>
          <h2 style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 800,
            fontSize: '30px',
            color: '#000000',
            paddingTop: '-50px'
          }}>
            Esqueceu a Senha?
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
            placeholder="E-mail"
          />

          {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
          {state.message && <p style={{ color: 'green' }}>{state.message}</p>}

          <button
            type="button"
            style={{
              width: '327px',
              height: '38px',
              backgroundColor: '#689CFF',
              color: '#FFFFFF',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
              fontSize: '18px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={handleSubmit}
          >
            Enviar
          </button>

          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            color: '#000000',
            textAlign: 'center'
          }}>
            Lembrou a senha?
            <button
              type="button"
              style={{
                fontWeight: 700,
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
              onClick={onLoginClick}
            >
              Voltar ao Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EsqueciSenha;