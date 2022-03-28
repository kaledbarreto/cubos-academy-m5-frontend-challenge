import { Link, useParams } from "react-router-dom";
import "./style.css";

function TitleHeader() {
  const paginaAtual = window.location.pathname;
  let { id } = useParams();

  if (paginaAtual === "/home") {
    return <h1 className="title-header-home">Resumo das cobranças</h1>;
  }

  if (paginaAtual === "/clientes") {
    return (
      <div className="title-header-container">
        <span className="title-header-prev">Clientes</span>
      </div>
    );
  }

  if (paginaAtual === "/cobrancas") {
    return (
      <div className="title-header-container">
        <span className="title-header-prev">Cobranças</span>
      </div>
    );
  }
  if (paginaAtual === `/clientDetail/${id}`) {
    return (
      <div className="title-header-container">
        <Link to="/clientes" className="title-header-prev">
          Clientes
        </Link>
        <span> &#160;&#160;&#160; {">"} &#160;&#160;&#160;</span>
        <span >Detalhes do cliente</span>
      </div>
    );
  }
}

export default TitleHeader;