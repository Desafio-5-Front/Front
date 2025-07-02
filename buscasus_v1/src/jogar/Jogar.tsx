import React, { useEffect } from "react";

const Jogar: React.FC = () => {
  useEffect(() => {
    window.location.href = "https://saude-em-acao-ten.vercel.app/";
  }, []);

  return (
    <div
      style={{
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
      }}
    >
      <p style={{ fontSize: "1.2rem", color: "#333" }}>
        Redirecionando para o jogo...
      </p>
    </div>
  );
};

export default Jogar;