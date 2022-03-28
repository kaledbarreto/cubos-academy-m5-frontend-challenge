import { format } from "date-fns";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import ChargeIcon from "../../assets/cobrancas-icon.svg";
import DeleteIcon from '../../assets/delete-icon.svg';
import EditIcon from '../../assets/edit-icon.svg';
import FilterIcon from '../../assets/filter-icon.svg';
import SearchIcon from '../../assets/search-icon.svg';
import UpDownIcon from '../../assets/upDown-icon.svg';
import Header from "../../components/Header";
import LateralMenu from "../../components/LateralMenu";
import ModalConfirmDelete from "../../components/ModalConfirmDelete";
import ModalDetailCharge from '../../components/ModalDetailCharge';
import ModalEditCharge from '../../components/ModalEditCharge';
import ModalSearchUndefined from "../../components/ModalSearchUndefined/Index";
import useGlobal from '../../hooks/useGlobal';
import useRequests from '../../hooks/useRequest';
import "./styles.css";
import { orderColumnAsc, orderColumnDesc } from "./utils";

function Charges() {

  const { token } = useGlobal();
  const [cobrancas, setCobrancas] = useState([]);
  const [filter, setFilter] = useState('nomeCliente');
  const [order, setOrder] = useState('asc');
  const [openCDelete, setopenCDelete] = useState(false);
  const [openCEdit, setopenCEdit] = useState(false);
  const [charge, setCharge] = useState();
  const [searcht, setSearcht] = useState("");
  const requests = useRequests();
  const [openDC, setOpenDC] = useState();
  const location = useLocation();
  const [array, setArray] = useState([]);
  const [openSUndefined, setOpenSUndefined] = useState(false);

  function formataValor(valor) {
    let valorFormatado = valor / 1000;
    return valorFormatado;
  }

  useEffect(() => {
    if (token) {
      loadCobrancas();
    }
  }, [openCDelete, openCEdit]);

  useEffect(() => {
    if (order === 'desc') {
      orderAllCobrancasByDesc();
      return;
    }

    orderAllCobrancasByAsc();
  }, [filter, order]);

  async function loadCobrancas() {
    const result = await requests.get('cobrancas');
    if (location.state) {
      if (location.state.filter === "pay") {

        let cobPagas = result.filter(function (cobranca) {
          if (cobranca.statuscobranca.toLowerCase() === "pago") {
            return cobranca;
          }
        });
        setCobrancas(cobPagas);
        setArray(cobPagas)
        return;
      }
      if (location.state.filter === "unsucceful") {

        let cobVencida = result.filter(function (cobranca) {
          if (cobranca.statuscobranca.toLowerCase() === "vencida") {
            return cobranca;
          }
        });
        setCobrancas(cobVencida);
        setArray(cobVencida)
        return;
      }
      if (location.state.filter === "preview") {

        let cobPendentes = result.filter(function (cobranca) {
          if (cobranca.statuscobranca.toLowerCase() === "pendente") {
            return cobranca;
          }
        });
        setCobrancas(cobPendentes);
        setArray(cobPendentes)
        return;
      }
    }

    setCobrancas(result);
    setArray(result);
  }

  function handleDeleteCharge(charge) {

    setCharge(charge);
    setopenCDelete(true);
  }

  function handleEditCharge(charge) {
    setCharge(charge);
    setopenCEdit(true);
  }

  function handleOpenDetailCharge(charge) {
    setCharge(charge);
    setOpenDC(true);
  }

  function handleOrderCobrancas(newCobrancas) {
    setCobrancas(newCobrancas);
  }

  function orderAllCobrancasByAsc() {
    let localCobrancas = [...cobrancas];
    localCobrancas.sort((a, b) => orderColumnAsc(a, b, filter));

    handleOrderCobrancas(localCobrancas);
    setArray(localCobrancas);
  }

  function orderAllCobrancasByDesc() {
    let localCobrancas = [...cobrancas];
    localCobrancas.sort((a, b) => orderColumnDesc(a, b, filter));

    handleOrderCobrancas(localCobrancas);
    setArray(localCobrancas);
  }

  function handleChangeFilter(type) {
    if (filter === type) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
      return;
    }
    setFilter(type);
  }

  function searchItems(search) {
    setArray(cobrancas.filter((cobranca) => {
      if (search == "") {
        return cobranca
      } else if (
        cobranca.nomecliente.toLowerCase().includes(search.toLowerCase())

      ) {
        return cobranca
      } else if (
        cobranca.id.toString().includes(search.toString())) {
        return cobranca;
      }
    }))

  }

  return (
    <div className="container">
      <LateralMenu />
      <Header />
      <div className="container-content">
        <div className="content-header">
          <div className="header-title">
            <img src={ChargeIcon} alt="Cobrança" />
            <span>Cobranças</span>
          </div>
          <div className="header-buttons">
            <button className="buttton-filter">
              <img src={FilterIcon} alt="Filtro" />
            </button>
            <div className="input-search">
              <input className="input-search"
                type="text"
                placeholder="Pesquisa..."
                onChange={(event) => {
                  setSearcht(event.target.value)
                  searchItems(event.target.value);
                }}
              />
              <img src={SearchIcon} alt="Pesquisar" />
            </div>
          </div>
        </div>
        <table className="content-table ">
          <thead >
            <tr className="table-tr">
              <th
                className="colunm-filter"
                onClick={() => handleChangeFilter('nomeCliente')}
              >
                {filter === 'nomeCliente' &&
                  <img
                    src={UpDownIcon}
                    className="table-th-img"
                    alt="Filtro"
                  />
                }
                <span>Cliente</span>
              </th>
              <th
                className="colunm-filter"
                onClick={() => handleChangeFilter('idCobrança')}
              >
                {filter === 'idCobrança' &&
                  <img
                    src={UpDownIcon}
                    className="table-th-img"
                    alt="Filtro"
                  />
                }
                <span className='container-table-client-space'>ID Cob.</span>
              </th>
              <th>Valor</th>
              <th>Data de venc.</th>
              <th>Status</th>
              <th>Descrição</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {array.map((cobranca) => (
              <tr key={cobranca.id} className="table-tr">
                <td className="table-td cclick" onClick={() => handleOpenDetailCharge(cobranca)}>{cobranca.nomecliente}</td>
                <td className="table-td cclick" onClick={() => handleOpenDetailCharge(cobranca)}>{cobranca.id}</td>
                <td className="table-td cclick" onClick={() => handleOpenDetailCharge(cobranca)}>R$ {formataValor(cobranca.valor)}</td>
                <td className="table-td cclick" onClick={() => handleOpenDetailCharge(cobranca)}>{format(new Date(cobranca.vencimento), "dd/MM/yyyy")}</td>
                <td className="table-td cclick" onClick={() => handleOpenDetailCharge(cobranca)}>
                  <span className={cobranca.statuscobranca === "Pago" ? "table-td-blue" :
                    cobranca.statuscobranca === "Pendente" ? "table-td-yellow" : "table-td-red"}>
                    {cobranca.statuscobranca}
                  </span>
                </td>
                <td className="table-td cclick" onClick={() => handleOpenDetailCharge(cobranca)}>{cobranca.descricao}</td>
                <td className="table-td">
                  <div className="table-td-buttons">
                    <div className="td-button" onClick={() => handleEditCharge(cobranca)}>
                      <img src={EditIcon} alt="Editar" className="img-editIcon" />
                      <span className="td-edit">
                        Editar
                      </span>
                    </div>
                    <div className="td-button" onClick={() => handleDeleteCharge(cobranca)}>
                      <img src={DeleteIcon} alt="Excluir" className="img-deleteIcon" />
                      <span className="td-delete">
                        Excluir
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        {array.length === 0 && (
          <ModalSearchUndefined
            openSUndefined={openSUndefined}
            setOpenSUndefined={setOpenSUndefined}
          />
        )}
      </div>
      <ModalConfirmDelete
        openCDelete={openCDelete}
        setopenCDelete={setopenCDelete}
        charge={charge} />

      {openDC && <ModalDetailCharge
        openDC={openDC}
        setOpenDC={setOpenDC}
        charge={charge}
      />}

      {openCEdit && <ModalEditCharge
        openCEdit={openCEdit}
        setopenCEdit={setopenCEdit}
        charge={charge}
      />}


    </div>
  );
}

export default Charges;