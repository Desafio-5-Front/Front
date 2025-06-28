import React, { useState } from "react";
import "./Cadastro.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../../images/icon2.png"

//Define a interface para o componente Cadastro
interface CadastroState {
    email: string;
    nome: string;
    senha: string;
    confirmSenha: string;
    error: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
}

interface CadastroProps {
  onClose: () => void;
  onLoginClick: () => void;
}

// Define a interface para o estado da localização
interface LocationState {
    email?: string;
}

// Define o componente funcional cadastro
const Cadastro: React.FC<CadastroProps> = ({onClose, onLoginClick}) => {
    const {state} = useLocation() as {state?: LocationState};
    const navigate = useNavigate();

    // Inicializa o estado do formulário
    const [stateCadastro, setStateCadastro] = useState <CadastroState> ({
       email: state?.email || "",
        nome: "",
        senha: "",
        confirmSenha: "",
        error: "",
        showPassword: false,
        showConfirmPassword: false,
    });

    //Função para o envio do formulário de Cadastro
    const handleSubmit = () => {
        const existingEmail = localStorage.getItem ("userEmail");
        
        //Valida se todos os campos estão preenchidos
        if (!stateCadastro.email || !stateCadastro.nome || !stateCadastro.senha|| !stateCadastro.confirmSenha ) {
            setStateCadastro ((prev) => ({...prev, error: "Todos os campos são obrigatórios"}));
            return;
        }

        // Valida se as senhas coincidem
        if (stateCadastro.senha !== stateCadastro.confirmSenha) {
            setStateCadastro ((prev) => ({...prev, error: "As senhas não coincidem."}));
            return;
        }

        //Verifica duplicidade do email
        if (existingEmail === stateCadastro.email) {
            setStateCadastro ((prev) => ({...prev, error: "Email já cadastrado"}));
            return
        }

        //Salva os dados no localStorage e configura o login
        localStorage.setItem ("userNome", stateCadastro.nome);
        localStorage.setItem ("userEmail", stateCadastro.email);
        localStorage.setItem ("userSenha", stateCadastro.senha);
        localStorage.setItem ("isLoggedIn", "true");
        setStateCadastro ((prve) => ({...prve, error: "Cadastro realizado com sucesso." }));
        setTimeout (() => navigate("/jogar"), 1000);
    };

    return (
    <div className="cadastro-container" onClick={(e) => e.stopPropagation()}>
      <div className="cadastro-box" >
        <button className="back-button" onClick={onClose}>
          &larr;
        </button>
        <img src={logoImage} alt="ConectaSUS Logo" className="cadastro-logo" />  
        <form className="formulario-container">
          <h2 className="cadastro-header">Cadastrar</h2>
          <input
            type="text"
            value={stateCadastro.nome}
            onChange={(e) => setStateCadastro((prev) => ({ ...prev, nome: e.target.value }))}
            placeholder="Nome"
            className="cadastro-input"
          />
          <input
            type="email"
            value={stateCadastro.email}
            onChange={(e) => setStateCadastro((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="E-mail"
            className="cadastro-input"
          />
          <div className="password-container">
            <input
              type={stateCadastro.showPassword ? "text" : "password"}
              value={stateCadastro.senha}
              onChange={(e) => setStateCadastro((prev) => ({ ...prev, senha: e.target.value }))}
              placeholder="Senha"
              className="cadastro-input"
            />
            <span
              className="toggle-password"
              onClick={() => setStateCadastro((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
            >
              {stateCadastro.showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
          <div className="password-container">
            <input
              type={stateCadastro.showConfirmPassword ? "text" : "password"}
              value={stateCadastro.confirmSenha}
              onChange={(e) => setStateCadastro((prev) => ({ ...prev, confirmSenha: e.target.value }))}
              placeholder="Confirmar Senha"
              className="cadastro-input"
            />
            <span
              className="toggle-password"
              onClick={() => setStateCadastro((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
            >
              {stateCadastro.showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
          
          {stateCadastro.error && <p className="error">{stateCadastro.error}</p>}
          <button type="button" className="cadastro-button" onClick={handleSubmit}>Cadastrar-se</button> {/* Texto ajustado para "Cadastrar-se" */}
          <p className="cadastro-link">
            Tem uma conta? <Link to="/login" onClick={onLoginClick}>Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;