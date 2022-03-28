import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  useParams
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import EditGreen from "../../assets/EditGreen.svg";
import editar from "../../assets/TableEditGray.svg";
import excluir from "../../assets/TrashRed.svg";
import UpDownIcon from '../../assets/upDown-icon.svg';
import UserGrayDetail from "../../assets/UserGray.svg";
import Header from "../../components/Header";
import LateralMenu from "../../components/LateralMenu";
import ModalConfirmDelete from "../../components/ModalConfirmDelete";
import ModalDetailCharge from "../../components/ModalDetailCharge";
import ModalEditCharge from "../../components/ModalEditCharge";
import ModalEditClient from "../../components/ModalEditClient";
import ModalNewCharge from "../../components/ModalNewCharge";
import useGlobal from "../../hooks/useGlobal";
import useRequests from '../../hooks/useRequest';
import "./style.css";
import { orderColumnAsc, orderColumnDesc } from "./utils";

function formataValor(valor) {
  return valor / 1000
}

function ClientDetail() {
  const [openMEClient, setOpenMEClient] = useState(false);
  const [openNCharge, setOpenNCharge] = useState(false);
  const [openCDelete, setopenCDelete] = useState(false);
  const [openDC, setOpenDC] = useState();
  const [openCEdit, setopenCEdit] = useState(false);
  const [cliente, setCliente] = useState([]);
  const [cobrancasCliente, setCobrancasCliente] = useState([]);
  const [charge, setCharge] = useState();
  const [filter, setFilter] = useState('cobrancaId');
  const [order, setOrder] = useState('asc');

  const { token } = useGlobal();
  const requests = useRequests();
  let { id } = useParams();

  useEffect(() => {
    if (token) {
      loadClientDetail();
    }
  }, [openCDelete, openCEdit, openNCharge, openMEClient]);

  useEffect(() => {
    if (order === 'desc') {
      orderAllCobrancasDetailByDesc();
      return;
    }

    orderAllCobrancasDetailByAsc();
  }, [filter, order]);

  function handleOrderCobrancasDetail(newCobrancas) {
    setCobrancasCliente(newCobrancas);
  }

  function orderAllCobrancasDetailByAsc() {
    let localCobrancasDetail = [...cobrancasCliente];
    localCobrancasDetail.sort((a, b) => orderColumnAsc(a, b, filter));

    handleOrderCobrancasDetail(localCobrancasDetail);
  }

  function orderAllCobrancasDetailByDesc() {
    let localCobrancasDetail = [...cobrancasCliente];
    localCobrancasDetail.sort((a, b) => orderColumnDesc(a, b, filter));

    handleOrderCobrancasDetail(localCobrancasDetail);
  }

  function handleChangeFilter(type) {
    if (filter === type) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
      return;
    }
    setFilter(type);
  }

  async function loadClientDetail() {
    const result = await requests.getOne('clientes', id);
    const { cobrancas } = result;
    setCobrancasCliente(cobrancas);
    setCliente(result);
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

  return (
    <div className="clientDetail">
      <LateralMenu />
      <Header className="header" />
      <div className="client-detail-container">
        <div className="client-detail-top">
          <img src={UserGrayDetail} alt="" width="32px" />
          <h1>{cliente.nome}</h1>
        </div>
        <div className="client-detail-data">
          <div className="client-detail-container2">
            <h2>Dados do Cliente</h2>
            <button
              onClick={() => setOpenMEClient(true)}
            >
              <img src={EditGreen} alt="" />
              Editar Cliente
            </button>
          </div>
          <table className="client-detail-t1">
            <thead>
              <tr>
                <th>Email</th>
                <th>Telefone</th>
                <th>CPF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.cpf}</td>
              </tr>
            </tbody>
            <br /><br /><br />
            <thead>
              <tr>
                <th>Endereço</th>
                <th>Bairro</th>
                <th>Complemento</th>
                <th>CEP</th>
                <th>Cidade</th>
                <th>UF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cliente.logradouro}</td>
                <td>{cliente.bairro}</td>
                <td>{cliente.complemento}</td>
                <td>{cliente.cep}</td>
                <td>{cliente.cidade}</td>
                <td>{cliente.estado}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="client-detail-charge-container-big">
          <div className="client-detail-charge-container">
            <h2>Cobranças Do Cliente</h2>
            <button
              onClick={() => setOpenNCharge(true)}
            >
              + Nova Cobrança
            </button>
          </div>
          <table className="client-detail-charge-container-table">
            <thead className="client-detail-charge-container-table-thead">
              <tr className="client-detail-charge-container-table-tr-td">
                <th
                  className="colunm-filter-detail-cliente"
                  onClick={() => handleChangeFilter('cobrancaId')}
                >
                  {filter === 'cobrancaId' && <img src={UpDownIcon} alt="" />}
                  &#160; ID. Cob
                </th>
                <th
                  className="colunm-filter-detail-cliente"
                  onClick={() => handleChangeFilter('dataVencimento')}
                >
                  {filter === 'dataVencimento' && <img src={UpDownIcon} alt="" />}
                  &#160;&#160;Data de Venc.
                </th>
                <th>Valor</th>
                <th>Status</th>
                <th>Descrição</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cobrancasCliente.map((cobranca) => (
                <tr className="client-detail-charge-container-table-tr"
                >
                  <td className="dcclick" onClick={() => handleOpenDetailCharge(cobranca)}>{cobranca.id}</td>
                  <td className="dcclick" onClick={() => handleOpenDetailCharge(cobranca)}>{format(new Date(cobranca.vencimento), "dd/MM/yyyy")}</td>
                  <td className="dcclick" onClick={() => handleOpenDetailCharge(cobranca)}>R$ {formataValor(cobranca.valor)}</td>
                  <td className="dcclick" onClick={() => handleOpenDetailCharge(cobranca)}>

                    <span className={cobranca.statuscobranca === "Pago" ? "client-detail-paga" :
                      cobranca.statuscobranca === "Pendente" ? "client-detail-pendente" : "client-detail-vencida"} >
                      {cobranca.statuscobranca}</span>
                  </td>
                  <td onClick={() => handleOpenDetailCharge(cobranca)} className="client-detail-charge-container-desc dcclick">
                    {cobranca.descricao}
                  </td>
                  <td>
                    &#160;&#160;
                    <img
                      src={editar}
                      alt="Editar"
                      className="edit-icon"
                      onClick={() => handleEditCharge(cobranca)}
                    />

                    &#160;&#160;
                    <img
                      src={excluir}
                      alt="Excluir"
                      onClick={() => handleDeleteCharge(cobranca)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalEditClient
        openMEClient={openMEClient}
        setOpenMEClient={setOpenMEClient}
      />
      <ModalNewCharge
        openNCharge={openNCharge}
        setOpenNCharge={setOpenNCharge} />
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

export default ClientDetail;