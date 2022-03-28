import { format } from "date-fns";
import { useEffect, useState } from "react";
import CloseIcon from '../../assets/close-icon.svg';
import ChargeIcon from "../../assets/cobrancas-icon.svg";
import useGlobal from "../../hooks/useGlobal";
import './styles.css';

function ModalDetailCharge({ openDC, setOpenDC, charge }) {
  const [cliented, setCliented] = useState('');
  const { token } = useGlobal();

  useEffect(() => {
    if (token) {
      loadClientDetail();
    }
  }, []);

  async function loadClientDetail() {
    setCliented(charge);
  }

  return (
    <div className="modalDC-backdrop" style={{ display: !openDC && 'none' }}>
      <div className="modalDC-content">
        <img
          className="modalDC-close-icon"
          src={CloseIcon}
          alt="Fechar"
          onClick={() => setOpenDC(false)}
        />
        <div className="modalDC-title">
          <img src={ChargeIcon} alt="Clientes" />
          <h1>Detalhe da Cobrança</h1>
        </div>
        <table className='modalDC-table'>
          <thead className='modalDC-table-thead'>
            <tr className='modalDC-table-tr'>
              <th className='modalDC-table-th' colSpan={2}>Nome
                <br />
              </th>
            </tr>
          </thead>

          <tbody className='modalDC-table-tbody'>

            <tr className='modalDC-table-tr'>
              <td className='modalDC-table-td' colSpan={2}>
                {cliented.nomecliente}
                <br /><br />
              </td>
            </tr>

          </tbody >
          <thead className='modalDC-table-thead'>
            <tr className='modalDC-table-tr'>
              <th className='modalDC-table-th modalDC-description' colSpan={2}>
                Descrição
                <br />
              </th>
            </tr>
          </thead>
          <tbody className='modalDC-table-tbody'>
            <tr className='modalDC-table-tr'>
              <td className='modalDC-table-td modalDC-description' colSpan={2}>
                {cliented.descricao}
              </td>
            </tr>
            <br /><br />
          </tbody>
          <thead className='modalDC-table-thead'>
            <tr className='modalDC-table-tr'>
              <th className='modalDC-table-th'>Vencimento</th>
              <th className='modalDC-table-th'>Valor</th>
            </tr>
          </thead>
          <tbody className='modalDC-table-tbody'>
            <tr className='modalDC-table-tr'>
              <td className='modalDC-table-td'>{format(new Date(charge.vencimento), "dd/MM/yyyy")}</td>
              <td className='modalDC-table-td'>R$ {cliented.valor / 1000}</td>
            </tr>
            <br />
          </tbody>
          <thead className='modalDC-table-thead'>
            <tr className='modalDC-table-tr'>
              <th className='modalDC-table-th'>ID Cobranças</th>
              <th className='modalDC-table-th'>Status</th>
            </tr>
          </thead>
          <tbody className='modalDC-table-tbody'>
            <tr className='modalDC-table-tr'>
              <td className='modalDC-table-td'>{cliented.id}</td>
              <td className='modalDC-table-td '>
                <span className={cliented.statuscobranca == "Pago" ? "modalDC-blue" :
                  cliented.statuscobranca == "Pendente" ? "modalDC-yellow" : "modalDC-red"
                }>
                  {cliented.statuscobranca}
                </span>
              </td>
            </tr>
            <br />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModalDetailCharge;