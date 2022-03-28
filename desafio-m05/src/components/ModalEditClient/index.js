import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useParams } from 'react-router-dom';
import ClientsIcon from '../../assets/clientes-icon.svg';
import CloseIcon from '../../assets/close-icon.svg';
import popup from '../../helpers/toast';
import useGlobal from "../../hooks/useGlobal";
import useRequests from '../../hooks/useRequest';
import './style.css';

function ModalEditClient({ openMEClient, setOpenMEClient }) {
  const [nome, setNome] = useState('');
  const [email, setEmailClient] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [enderecoClient, setEnderecoClient] = useState('');
  const [complementoClient, setComplementoClient] = useState('');
  const [cep, setCep] = useState('');
  const [bairroClient, setBairroClient] = useState('');
  const [cidadeClient, setCidadeClient] = useState('');
  const [ufClient, setUfClient] = useState('');
  const [inputError, setInputError] = useState(false);

  const requests = useRequests();
  let { id } = useParams();
  const { token } = useGlobal();

  useEffect(() => {
    if (token) {
      loadClientDetail();
    }
  }, []);

  async function loadClientDetail() {
    const result = await requests.getOne('clientes', id);
    const { nome, email, cpf, telefone, bairro, cep, cidade, logradouro, complemento, estado } = result;
    setNome(nome);
    setEmailClient(email);
    setCpf(cpf);
    setTelefone(telefone);
    setBairroClient(bairro);
    setCep(cep);
    setCidadeClient(cidade);
    setEnderecoClient(logradouro);
    setComplementoClient(complemento);
    setUfClient(estado);
  }

  async function handleSubmitClient(event) {
    event.preventDefault();

    if (!nome || !email || !cpf || !telefone || cep.indexOf('_') !== -1 || telefone.indexOf('_') !== -1 || cpf.indexOf('_') !== -1) {
      setInputError(true);
      return;
    }

    const body = {
      nome: nome,
      email: email,
      cpf: cpf,
      telefone: telefone,
      cep: cep,
      logradouro: enderecoClient,
      complemento: complementoClient,
      bairro: bairroClient,
      cidade: cidadeClient,
      estado: ufClient
    };

    const result = await requests.putOneClient('clientes', body, id, true);
    await requests.putNomeClienteCobranca('nomeclientecobranca', id, body, true);

    if (result) {
      setOpenMEClient(false);
      popup.messageSuccessBlue('Cliente Atualizado!');
    }
  }
  function closeModal() {
    setOpenMEClient(false);
    loadClientDetail();
  }
  return (
    <div className="modal-editc-backdrop" style={{ display: !openMEClient && 'none' }}>
      <div className="modal-editc-content">
        <img
          className="modal-editc-close-icon"
          src={CloseIcon}
          alt="Fechar"
          onClick={() => closeModal()}
        />
        <div className="modal-editc-title">
          <img src={ClientsIcon} alt="Clientes" />
          <h1>Editar Cliente</h1>
        </div>
        <form onSubmit={handleSubmitClient}>
          <div className="modal-editc-form-inputs w100me">
            <label>Nome*</label>
            <input
              type="text"
              placeholder="Digite o nome"
              style={inputError && !nome ?
                { border: "1px solid #E70000" } :
                { border: "1px solid #D0D5DD" }}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <p
              style={inputError && !nome ? { display: "flex" } : { display: "none" }}
              className="mensagem-error"
            >
              Este campo deve ser preenchido
            </p>
          </div>
          <div className="modal-editc-form-inputs w100me">
            <label>E-mail*</label>
            <input
              type="text"
              placeholder="Digite o e-mail"
              style={inputError && !email ?
                { border: "1px solid #E70000" } :
                { border: "1px solid #D0D5DD" }}
              value={email}
              onChange={(e) => setEmailClient(e.target.value)}
            />
            <p
              style={inputError && !email ? { display: "flex" } : { display: "none" }}
              className="mensagem-error"
            >
              Este campo deve ser preenchido
            </p>
          </div>
          <div className="modal-editc-combined-inputs">
            <div className="modal-editc-form-inputs">
              <label>CPF*</label>
              <InputMask
                mask="999.999.999-99"
                placeholder="Digite o CPF"
                style={inputError && !cpf || cpf.indexOf('_') !== -1 ?
                  { border: "1px solid #E70000" } :
                  { border: "1px solid #D0D5DD" }}
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <p
                style={inputError && !cpf || cpf.indexOf('_') !== -1 ? { display: "flex" } : { display: "none" }}
                className="mensagem-error"
              >
                Este campo deve ser preenchido
              </p>
            </div>
            <div className="modal-editc-form-inputs">
              <label>Telefone*</label>
              <InputMask
                mask="(99) 99999-9999"
                placeholder="Digite o Telefone"
                style={inputError && !telefone || telefone.indexOf('_') !== -1 ?
                  { border: "1px solid #E70000" } :
                  { border: "1px solid #D0D5DD" }}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <p
                style={inputError && !telefone || telefone.indexOf('_') !== -1 ? { display: "flex" } : { display: "none" }}
                className="mensagem-error"
              >
                Este campo deve ser preenchido
              </p>
            </div>
          </div>
          <div className="modal-editc-form-inputs">
            <label>Endereço</label>
            <input
              type="text"
              placeholder="Digite o Endereço"
              value={enderecoClient}
              onChange={(e) => setEnderecoClient(e.target.value)}
            />
          </div>
          <div className="modal-editc-form-inputs">
            <label>Complemento</label>
            <input
              type="text"
              placeholder="Digite o Complemento"
              value={complementoClient}
              onChange={(e) => setComplementoClient(e.target.value)}
            />
          </div>
          <div className="modal-editc-combined-inputs">
            <div className="modal-editc-form-inputs">
              <label>CEP</label>
              <InputMask
                mask="99999-999"
                placeholder="Digite o CEP"
                style={inputError && cep.indexOf('_') !== -1 ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
              <p
                style={inputError && cep.indexOf('_') !== -1 ? { display: "flex" } : { display: "none" }}
                className="mensagem-error"
              >
                CEP Inválido
              </p>
            </div>
            <div className="modal-editc-form-inputs">
              <label>Bairro</label>
              <input
                type="text"
                placeholder="Digite o Bairro"
                value={bairroClient}
                onChange={(e) => setBairroClient(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-editc-combined-inputs">
            <div className="modal-editc-form-inputs">
              <label>Cidade</label>
              <input
                id="modal-ec-city-input"
                type="text"
                placeholder="Digite a Cidade"
                value={cidadeClient}
                onChange={(e) => setCidadeClient(e.target.value)}
              />
            </div>
            <div className="modal-editc-form-inputs">
              <label>UF</label>
              <input
                id="modal-ec-uf-input" type="text"
                placeholder="Digite a UF"
                value={ufClient}
                onChange={(e) => setUfClient(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-editc-form-buttons">
            <span className="mec-cancel"
              onClick={() => closeModal()}>Cancelar</span>
            <button
              className="mec-apply"
            >
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditClient;