import CheckIcon from '../../assets/CheckIcon.svg';
import "./style.css";

function ModalConfirmEdit({ openModalComfirm }) {
    return (
        <div className="backdrop3" style={{ display: !openModalComfirm && 'none' }}>
            <div className="modal-content3">
                <img
                    className="CheckIcon"
                    src={CheckIcon}
                    alt="Fechar"
                />
                <div className="title-modal3">
                    <h1>Cadastro Alterado Com Sucesso</h1>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirmEdit;