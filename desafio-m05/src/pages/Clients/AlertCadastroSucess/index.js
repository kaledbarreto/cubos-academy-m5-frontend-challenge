import './style.css'
import IconOk from '../../../assets/icon-cadastro-ok.svg'
import IconClose from '../../../assets/icon-close-cadastro-sucess.svg'

function AlertCadastroSucess({ open, setOpen }) {
  return (
    <div
      style={!open ? { display: 'none' } : { display: 'flex' }}
      className="alert-cadastro-sucess"
    >
      <img src={IconOk} alt="icon-ok" />
      <span>Cliente Cadastrado com Sucesso!</span>
      <img
        className="close-alert-cadastro-ok"
        onClick={() => setOpen(false)}
        src={IconClose} alt="icon-close"
      />
    </div>
  );
};

export default AlertCadastroSucess;