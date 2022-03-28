import { useEffect, useState } from "react";
import useGlobal from "../../../hooks/useGlobalProvider";
import useRequests from '../../../hooks/useRequest';
import ButtonAbrirPopUp from './ButtonAbrirPopUp';
import './styles.css';

function User() {
  const requests = useRequests();
  const { token, openModalComfirm } = useGlobal();
  const [nomeInicial, setNomeInicial] = useState([]);
  const [letraInicialNome, setLetraInicialNome] = useState([]);

  useEffect(() => {
    if (token) {
      buscarNomeUser();
    }
  }, [openModalComfirm]);

  async function buscarNomeUser() {
    const result = await requests.get('usuarios');
    const { nome } = result;
    let nomeCompleto = nome.split(' ');
    let primeiroNome = nomeCompleto[0];
    let avatar = primeiroNome.split('');
    setLetraInicialNome(avatar[0].toUpperCase() + avatar[1].toUpperCase())
    setNomeInicial(primeiroNome);
  }

  return (
    <div className="user">
      <span className="user-avatar">{letraInicialNome}</span>
      <span>{nomeInicial}</span>
      <ButtonAbrirPopUp
        buscarNomeUser={buscarNomeUser}
      />
    </div >
  );
}

export default User;