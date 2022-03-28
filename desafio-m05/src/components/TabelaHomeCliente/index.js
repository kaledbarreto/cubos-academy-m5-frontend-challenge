import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clientDayImg from "../../assets/ClientDay.svg";
import clientDefaulter from "../../assets/ClientDefaulter.svg";
import useGlobal from "../../hooks/useGlobal";
import useRequests from "../../hooks/useRequest";
import "./style.css";

function TabelaHomeCliente({ emDia, inadimplentes }) {
  const { token } = useGlobal();
  const requests = useRequests();
  const [clientes, setClientes] = useState([]);

  let clientesEmDia = clientes.filter(function (cliente) {
    if (cliente.statuscliente.toLowerCase() === "em dia") {
      return cliente;
    }
  });

  let clientesInadimplentes = clientes.filter(function (cliente) {
    if (cliente.statuscliente.toLowerCase() === "inadimplente") {
      return cliente;
    }
  });

  useEffect(() => {
    if (token) {
      loadClientes();
    }
  }, []);

  async function loadClientes() {
    const result = await requests.get("clientes");
    setClientes(result);
  }

  function formatCountClientes(valor) {
    if (valor < 10) {
      return `0${valor}`;
    } else {
      return valor;
    }
  }

  return (
    <table className="client-resume">
      <caption className="client-resume-title">
        <div className="client-resume-container">
          <div className="client-resume-container2">
            <img src={emDia ? clientDayImg : clientDefaulter} alt="" />
            <span>
              {emDia && "Clientes em dia"}
              {inadimplentes && "Clientes inadimplentes"}
            </span>
          </div>
          <span
            className="client-resume-score"
            style={
              emDia
                ? { background: "#EEF6F6", color: "#1FA7AF" }
                : { background: "#FFEFEF", color: "#971D1D" }
            }
          >
            {emDia && formatCountClientes(clientesEmDia.length)}
            {inadimplentes && formatCountClientes(clientesInadimplentes.length)}
          </span>
        </div>
      </caption>
      <thead>
        <tr className="client-resume-tr">
          <th className="client-resume-th">Cliente</th>
          <th className="client-resume-th">ID do clie.</th>
          <th className="client-resume-th">CPF</th>
        </tr>
      </thead>
      <tbody>
        {emDia &&
          clientesEmDia.slice(0, 4).map((cliente) => (
            <tr key={cliente.id} className="client-resume-tr">
              <td className="client-resume-td">{cliente.nome}</td>
              <td className="client-resume-td">{cliente.id}</td>
              <td className="client-resume-td">{cliente.cpf}</td>
            </tr>
          ))}

        {inadimplentes &&
          clientesInadimplentes.slice(0, 4).map((cliente) => (
            <tr key={cliente.id} className="client-resume-tr">
              <td className="client-resume-td">{cliente.nome}</td>
              <td className="client-resume-td">{cliente.id}</td>
              <td className="client-resume-td">{cliente.cpf}</td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} className="client-resume-footer">
            {inadimplentes && (
              <Link
                to={{
                  pathname: "/clientes",
                  state: { filter: "inadimplentes" },
                }}
              >
                Ver todos
              </Link>
            )}

            {emDia && (
              <Link
                to={{
                  pathname: "/clientes",
                  state: { filter: "Em dia" },
                }}
              >
                Ver todos
              </Link>
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default TabelaHomeCliente;
