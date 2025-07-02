import React from "react";
import "../App.css"; 
const Jogar: React.FC = () => {
  console.log("Renderizando página Jogar");
  return (
    <div style={{
      padding: "0",
      margin: "0", 
      textAlign: "center",
      width: "100vw",
      height: "100vh", 
      boxSizing: "border-box",
      backgroundColor: "#D3FCEA",
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
    }}>
      <iframe
        src="https://saude-em-acao-ten.vercel.app/"
        title="Saúde em Ação - O Jogo" 
        style={{
          width: "100%",       
          height: "100%",       
          border: "none",      
          display: "block",     
          backgroundColor: "#D3FCEA" 
        }}
        allowFullScreen 
      ></iframe>
    </div>
  );
};
export default Jogar;