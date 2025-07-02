import React from "react";
// A importação do arquivo CSS foi removida para resolver o erro de compilação,
// já que os estilos deste componente são todos aplicados via 'style' inline.

const Jogar: React.FC = () => {
  console.log("Renderizando página Jogar com a URL correta do iframe.");

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
      {/* A única mudança necessária é na propriedade 'src' do iframe.
        A URL antiga foi substituída pela URL correta e funcional do jogo.
      */}
      <iframe
        src="https://saude-em-acao-ten.vercel.app/" // <-- MUDANÇA PRINCIPAL AQUI
        title="Saúde em Ação - O Jogo" // Título para acessibilidade
        style={{
          width: "100%",        // Ocupa 100% da largura do contêiner pai
          height: "100%",       // Ocupa 100% da altura do contêiner pai
          border: "none",       // Remove a borda padrão do iframe
          display: "block",     // Remove espaço extra abaixo do iframe
          backgroundColor: "#D3FCEA" // Cor de fundo do iframe, caso haja carregamento
        }}
        allowFullScreen // Permite modo tela cheia
      ></iframe>
    </div>
  );
};

export default Jogar;