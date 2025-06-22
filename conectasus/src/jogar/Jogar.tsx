import React from "react";
import "../App.css"; // Importa o arquivo CSS global


const Jogar: React.FC = () => {
  console.log("Renderizando página Jogar");
  return (
    <div style={{
      padding: "20px",
      textAlign: "center",
      width: "100vw", // 100% da largura da viewport
      height: "100vh", // 100% da altura da viewport
      boxSizing: "border-box", // Garante que padding não adicione largura/altura extra
      
      zIndex: "9999", 
      backgroundColor: "#D3FCEA"
    }}>
      <h1>Página de Jogo</h1>
      <p>Paciência. Aqui terá um jogo para você!</p>
      <p>Por favor, aguarde a próxima atualização para jogar!</p>
    </div>
  );
};

export default Jogar;