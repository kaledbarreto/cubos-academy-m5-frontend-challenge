import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AddIcon from "../../assets/add-icon.svg";
import AddCobranca from "../../assets/addCobranca-icon.svg";
import ClientsIcon from "../../assets/clientes-icon.svg";
import FilterIcon from "../../assets/filter-icon.svg";
import SearchIcon from "../../assets/search-icon.svg";
import UpDownIcon from "../../assets/upDown-icon.svg";
import Header from "../../components/Header";
import LateralMenu from "../../components/LateralMenu";
import ModalAddClient from "../../components/ModalAddClients";
import ModalNewCharge from "../../components/ModalNewCharge";
import ModalSearchUndefined from "../../components/ModalSearchUndefined/Index";
import useGlobal from "../../hooks/useGlobal";
import useRequests from "../../hooks/useRequest";
import AlertCadastroSucess from "./AlertCadastroSucess";
import "./styles.css";
import { orderColumnAsc, orderColumnDesc } from "./utils";

function Clients() {
  const {
    token,
    openAddEditModal,
    setOpenAddEditModal,
    currentClient,
    setCurrentClient,
  } = useGlobal();
  const [openNCharge, setOpenNCharge] = useState(false);
  const [openSUndefined, setOpenSUndefined] = useState(false);
  const [searchc, setSearchc] = useState("");
  const [clienteCobranca, setClienteCobranca] = useState();
  const [alertSucess, setAlertSucess] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [array, setArray] = useState([]);
  const [filter, setFilter] = useState('nomeCliente');
  const [order, setOrder] = useState('asc');

  const location = useLocation();

  const requests = useRequests();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlertSucess(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alertSucess]);

  useEffect(() => {
    if (token) {
      loadClients();
    }
  }, [openAddEditModal]);

  useEffect(() => {
    if (order === 'desc') {
      orderAllClientesByDesc();
      return;
    }

    orderAllClientesByAsc()
  }, [filter, order]);

  function handleOrderClientes(newClientes) {
    setClientes(newClientes);
  }

  function orderAllClientesByAsc() {
    let localClientes = [...clientes];
    localClientes.sort((a, b) => orderColumnAsc(a, b, filter));

    handleOrderClientes(localClientes);
    setArray(localClientes);
  }

  function orderAllClientesByDesc() {
    let localClientes = [...clientes];
    localClientes.sort((a, b) => orderColumnDesc(a, b, filter));

    handleOrderClientes(localClientes);
    setArray(localClientes);
  }

  function handleClienteFilter(type) {
    if (filter === type) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
      return;
    }
    setFilter(type);
  }

  async function loadClients() {
    const result = await requests.get("clientes");

    if (location.state) {
      if (location.state.filter === "inadimplentes") {
        let clientesInadimplentes = result.filter(function (cliente) {
          if (cliente.statuscliente.toLowerCase() === "inadimplente") {
            return cliente;
          }
        });
        setClientes(clientesInadimplentes);
        setArray(clientesInadimplentes);
        return;
      }

      if (location.state.filter === "Em dia") {
        let clientesEmDia = result.filter(function (cliente) {
          if (cliente.statuscliente.toLowerCase() === "em dia") {
            return cliente;
          }
        });
        setClientes(clientesEmDia);
        setArray(clientesEmDia);
        return;
      }
    }
    setClientes(result);
    setArray(result);
  }

  function handleOpenNewCharge(cliente) {
    setClienteCobranca(cliente);
    setOpenNCharge(true);
  }

  function searchItems(search) {
    setArray(clientes.filter((cliente) => {
      if (search === "") {
        return cliente;
      } else if (
        cliente.nome.toLowerCase().includes(search.toLowerCase())
      ) {
        return cliente;
      } else if (
        cliente.cpf.toString().includes(search.toString())
      ) {
        return cliente;
      } else if (
        cliente.email.toLowerCase().includes(search.toLowerCase())
      ) {
        return cliente;
      }
    }));
  }

  return (
    <div className="clients">
      <LateralMenu />
      <div className="content-container">
        <Header />
        <div className="clients-container">
          <div className="container-header">
            <div className="title-clients">
              <img src={ClientsIcon} alt="Clients Icon" />
              <span>Clientes</span>
            </div>
            <div className="buttons-clients">
              <button
                className="add-client"
                onClick={() => setOpenAddEditModal(true)}
              >
                <img src={AddIcon} alt="Add Icon" />
                Adicionar Cliente
              </button>
              <button className="filter-client">
                <img src={FilterIcon} alt="Filter Icon" />
              </button>
              <div className="search-client">
                <input
                  className="search-client"
                  type="text"
                  placeholder="Pesquisa"
                  onChange={(event) => {
                    setSearchc(event.target.value);
                    searchItems(event.target.value);
                  }}
                />
                <img src={SearchIcon} alt="Search Icon" />
              </div>
            </div>
          </div>
          <table className="container-table-client">
            <thead>
              <tr className="container-table-client-tr">
                <th
                  className="container-table-client-th space-client-th client-iconimg"
                  onClick={() => handleClienteFilter('nomeCliente')}
                >
                  {filter === 'nomeCliente' && <img
                    src={UpDownIcon}
                    className="container-table-client-img"
                    alt="Filtro"
                  />}
                  <span className="container-table-client-space">Cliente</span>
                </th>
                <th className="container-table-client-th">CPF</th>
                <th className="container-table-client-th">Email</th>
                <th className="container-table-client-th">Telefone</th>
                <th className="container-table-client-th">Status</th>
                <th className="container-table-client-th">Criar Cobrança</th>

              </tr>
            </thead>
            <tbody>
              {array
                .map((cliente) => (
                  <tr key={cliente.id} className="container-table-client-tr">
                    <td className="container-table-client-td ">
                      <Link
                        className="td-click"
                        to={`/clientDetail/${cliente.id}`}
                      >
                        {cliente.nome}
                      </Link>
                    </td>
                    <td className="container-table-client-td">
                      {cliente.cpf}
                    </td>
                    <td className="container-table-client-td">
                      {cliente.email}
                    </td>
                    <td className="container-table-client-td">
                      {cliente.telefone}
                    </td>
                    <td className="container-table-client-td">
                      <span
                        className={
                          cliente.statuscliente === "Em dia"
                            ? "emDia"
                            : "inadimplente"
                        }
                      >
                        {cliente.statuscliente}
                      </span>
                    </td>
                    <td
                      className="container-table-client-td cobrança-td"
                      onClick={() => handleOpenNewCharge(cliente)}
                    >
                      <img src={AddCobranca} alt="Cobrança" />
                      <a>Cobrança</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalAddClient
        open={openAddEditModal}
        setOpen={setOpenAddEditModal}
        setAlertSucess={setAlertSucess}
      />
      <AlertCadastroSucess open={alertSucess} setOpen={setAlertSucess} />
      {openNCharge && (
        <ModalNewCharge
          openNCharge={openNCharge}
          setOpenNCharge={setOpenNCharge}
          cliente={clienteCobranca}
        />
      )}
      {array.length === 0 && (
        <ModalSearchUndefined
          openSUndefined={openSUndefined}
          setOpenSUndefined={setOpenSUndefined}
        />
      )}
    </div>
  );
}

export default Clients;
