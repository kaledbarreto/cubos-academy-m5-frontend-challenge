import AlertIcon from '../../assets/alert-icon.svg';
import CloseIcon from '../../assets/close-icon.svg';
import popup from '../../helpers/toast';
import useRequests from '../../hooks/useRequest';
import "./style.css";

function ModalConfirmDelete({ openCDelete, setopenCDelete, charge }) {
    const requests = useRequests();

    async function handleDeleteCharge() {
        if (charge.statuscobranca === 'Pendente') {
            const result = await requests.deleteCharge('cobrancas', charge.id);
            if (result) {
                setopenCDelete(false);
                popup.messageSuccessBlue('Cobrança Apagada!');
            }
        } else {
            setopenCDelete(false);
            popup.messageError('Esta cobrança não pode ser excluída!');
        }
    }

    return (
        <div className="backdrop-MD" style={{ display: !openCDelete && 'none' }}>
            <div className="modal-content-MD">
                <img
                    className="close-icon-MD"
                    src={CloseIcon}
                    alt="Fechar"
                    onClick={() => setopenCDelete(false)}
                />
                <img className="alert-icon-MD" src={AlertIcon} alt="Alerta" />
                <div className='message-buttons-MD'>
                    <span className='message-MD'>Tem certeza que deseja excluir esta cobrança?</span>
                    <div className='buttons-MD'>
                        <button
                            className='red-button-MD'
                            onClick={() => setopenCDelete(false)}
                        >
                            Não
                        </button>
                        <button
                            className='green-button-MD'
                            onClick={() => handleDeleteCharge()}
                        >
                            Sim
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirmDelete;