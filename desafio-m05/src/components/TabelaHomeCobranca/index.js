import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import useGlobal from '../../hooks/useGlobal';
import useRequests from '../../hooks/useRequest';
import "./style.css";

function TabelaHomeCobranca({ pay, unsucceful, preview }) {
  const { token } = useGlobal();
  const requests = useRequests();
  const [cobrancas, setCobrancas] = useState([]);

  let cobPagas = cobrancas.filter(function (cobranca) {
    if (cobranca.statuscobranca.toLowerCase() === "pago") {
      return cobranca;
    }
  });

  let cobVencidas = cobrancas.filter(function (cobranca) {
    if (cobranca.statuscobranca.toLowerCase() === "vencida") {
      return cobranca;
    }
  });

  let cobPrevistas = cobrancas.filter(function (cobranca) {
    if (cobranca.statuscobranca.toLowerCase() === "pendente") {
      return cobranca;
    }
  });


  useEffect(() => {
    if (token) {
      loadCobrancas();
    }
  }, []);

  async function loadCobrancas() {
    const result = await requests.get('cobrancas');

    setCobrancas(result)
  }

  function formatCountCharges(valor) {
    if (valor < 10) {
      return `0${valor}`;
    }
    else {
      return valor;
    }

  }

  return (
    <table className="charge-resume">
      <caption className="charge-resume-title">
        <div className="charge-resume-container">
          <span>
            {pay && "Cobranças Pagas"}
            {unsucceful && "Cobranças Vencidas"}
            {preview && "Cobranças Previstas"}
          </span>
          <span
            className="charge-resume-score"
            style={
              pay
                ? { background: "#EEF6F6", color: "#1FA7AF" }
                : unsucceful
                  ? { background: "#FFEFEF", color: "#971D1D" }
                  : { background: "#FCF6DC", color: "#C5A605" }
            }
          >
            {pay && formatCountCharges(cobPagas.length)}
            {unsucceful && formatCountCharges(cobVencidas.length)}
            {preview && formatCountCharges(cobPrevistas.length)}
          </span>
        </div>
      </caption>
      <thead>
        <tr className="charge-resume-tr">
          <th className="charge-resume-th">Cliente</th>
          <th className="charge-resume-th">ID da cob.</th>
          <th className="charge-resume-th">Valor</th>
        </tr>
      </thead>
      <tbody>

        {pay && cobPagas.slice(0, 4).map((cob) => (
          <tr key={cob.id} className="charge-resume-tr">
            <td className="charge-resume-td">{cob.nomecliente}</td>
            <td className="charge-resume-td">{cob.id}</td>
            <td className="charge-resume-td">R$ {cob.valor / 1000}</td>
          </tr>
        ))}

        {unsucceful && cobVencidas.slice(0, 4).map((cob) => (
          <tr key={cob.id} className="charge-resume-tr">
            <td className="charge-resume-td">{cob.nomecliente}</td>
            <td className="charge-resume-td">{cob.id}</td>
            <td className="charge-resume-td">R$ {cob.valor / 1000}</td>
          </tr>
        ))}

        {preview && cobPrevistas.slice(0, 4).map((cob) => (
          <tr key={cob.id} className="charge-resume-tr">
            <td className="charge-resume-td">{cob.nomecliente}</td>
            <td className="charge-resume-td">{cob.id}</td>
            <td className="charge-resume-td">R$ {cob.valor / 1000}</td>
          </tr>
        ))}

      </tbody>
      <tfoot>
        <tr >
          <td colSpan={3} className="client-resume-footer">
            {pay && (
              <Link
                to={{
                  pathname: "/cobrancas",
                  state: { filter: "pay" },
                }}
              >
                Ver todos
              </Link>
            )}

            {unsucceful && (
              <Link
                to={{
                  pathname: "/cobrancas",
                  state: { filter: "unsucceful" },
                }}
              >
                Ver todos
              </Link>
            )}

            {preview && (
              <Link
                to={{
                  pathname: "/cobrancas",
                  state: { filter: "preview" },
                }}
              >
                Ver todos
              </Link>
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  )
};
export default TabelaHomeCobranca;
