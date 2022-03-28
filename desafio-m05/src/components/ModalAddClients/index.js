import { useState } from 'react';
import InputMask from 'react-input-mask';
import ClientsIcon from '../../assets/clientes-icon.svg';
import CloseIcon from '../../assets/close-icon.svg';
import popup from '../../helpers/toast';
import useRequests from '../../hooks/useRequest';
import './styles.css';

function ModalAddClient({ open, setOpen }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [enderecoClient, setEnderecoClient] = useState('');
  const [complementoClient, setComplementoClient] = useState('');
  const [cep, setCep] = useState('');
  const [bairroClient, setBairroClient] = useState('');
  const [cidadeClient, setCidadeClient] = useState('');
  const [ufClient, setUfClient] = useState('');
  const [input, setInput] = useState(false);

  const requests = useRequests();

  function handleClose() {
    setNome('');
    setEmail('');
    setCpf('');
    setTelefone('');
    setEnderecoClient('');
    setComplementoClient('');
    setCep('');
    setBairroClient('');
    setCidadeClient('');
    setUfClient('');
    setInput(false);
    setOpen(false);
  }

  async function handleSubmitClient(event) {
    event.preventDefault();

    if (!nome || !email || !cpf || !telefone || cep.indexOf('_') !== -1 || cpf.indexOf('_') !== -1 || telefone.indexOf('_') !== -1) {
      setInput(true)
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
      estado: ufClient,
      statuscliente: "Em dia"
    };

    const result = await requests.post('clientes', body, true);

    if (result) {
      handleClose();
      popup.messageSuccessBlue('Cliente Cadastrado!');
    }
  }

  return (
    <div className="backdrop" style={{ display: !open && 'none' }}>
      <div className="modal-content">
        <img
          className="close-icon"
          src={CloseIcon}
          alt="Fechar"
          onClick={() => handleClose()}
        />
        <div className="title-modal">
          <img src={ClientsIcon} alt="Clientes" />
          <h1>Cadastro do Cliente</h1>
        </div>
        <form onSubmit={handleSubmitClient}>
          <div className="form-inputs w100">
            <label>Nome*</label>
            <input
              type="text"
              placeholder="Digite o nome"
              style={input && !nome ?
                { border: "1px solid #E70000" } :
                { border: "1px solid #D0D5DD" }}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <p
              style={input && !nome ? { display: "flex" } : { display: "none" }}
              className="mensagem-error"
            >
              Este campo deve ser preenchido
            </p>
          </div>
          <div className="form-inputs w100">
            <label>E-mail*</label>
            <input
              type="text"
              placeholder="Digite o e-mail"
              style={input && !email ?
                { border: "1px solid #E70000" } :
                { border: "1px solid #D0D5DD" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p
              style={input && !email ? { display: "flex" } : { display: "none" }}
              className="mensagem-error"
            >
              Este campo deve ser preenchido
            </p>
          </div>
          <div className="combined-inputs">
            <div className="form-inputs">
              <label>CPF*</label>
              <InputMask
                mask="999.999.999-99"
                placeholder="Digite o CPF"
                style={input && !cpf || cpf.indexOf('_') !== -1 ?
                  { border: "1px solid #E70000" } :
                  { border: "1px solid #D0D5DD" }}
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <p
                style={input && !cpf || cpf.indexOf('_') !== -1 ? { display: "flex" } : { display: "none" }}
                className="mensagem-error"
              >
                Este campo deve ser preenchido
              </p>
            </div>
            <div className="form-inputs">
              <label>Telefone*</label>
              <InputMask
                mask="(99) 99999-9999"
                placeholder="Digite o Telefone"
                style={input && !telefone || telefone.indexOf('_') !== -1 ?
                  { border: "1px solid #E70000" } :
                  { border: "1px solid #D0D5DD" }}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <p
                style={input && !telefone || telefone.indexOf('_') !== -1 ? { display: "flex" } : { display: "none" }}
                className="mensagem-error"
              >
                Este campo deve ser preenchido
              </p>
            </div>
          </div>
          <div className="form-inputs">
            <label>Endereço</label>
            <input
              type="text"
              placeholder="Digite o Endereço"
              value={enderecoClient}
              onChange={(e) => setEnderecoClient(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <label>Complemento</label>
            <input
              type="text"
              placeholder="Digite o Complemento"
              value={complementoClient}
              onChange={(e) => setComplementoClient(e.target.value)}
            />
          </div>
          <div className="combined-inputs">
            <div className="form-inputs">
              <label>CEP</label>
              <InputMask
                mask="99999-999"
                placeholder="Digite o CEP"
                style={input && cep.indexOf('_') !== -1 ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
              <p
                style={input && cep.indexOf('_') !== -1 ? { display: "flex" } : { display: "none" }}
                className="mensagem-error"
              >
                CEP Inválido
              </p>
            </div>
            <div className="form-inputs">
              <label>Bairro</label>
              <input
                type="text"
                placeholder="Digite o Bairro"
                value={bairroClient}
                onChange={(e) => setBairroClient(e.target.value)}
              />
            </div>
          </div>
          <div className="combined-inputs">
            <div className="form-inputs">
              <label>Cidade</label>
              <input
                id="city-input"
                type="text"
                placeholder="Digite a Cidade"
                value={cidadeClient}
                onChange={(e) => setCidadeClient(e.target.value)}
              />
            </div>
            <div className="form-inputs">
              <label>UF</label>
              <input
                id="uf-input" type="text"
                placeholder="Digite a UF"
                value={ufClient}
                onChange={(e) => setUfClient(e.target.value)}
              />
            </div>
          </div>
          <div className="form-buttons">
            <span className="cancel"
              onClick={() => handleClose()}
            >Cancelar</span>
            <button
              className="apply"
            >
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalAddClient;