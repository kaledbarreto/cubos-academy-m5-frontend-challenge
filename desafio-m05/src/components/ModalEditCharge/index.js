import { format, isBefore } from 'date-fns';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useParams } from 'react-router-dom';
import CloseIcon from '../../assets/close-icon.svg';
import ChargeIcon from "../../assets/cobrancas-icon.svg";
import popup from '../../helpers/toast';
import useGlobal from "../../hooks/useGlobal";
import useRequests from '../../hooks/useRequest';
import './styles.css';

function ModalEditCharge({ openCEdit, setopenCEdit, charge }) {
    const [client, setClient] = useState('');
    const [nameClient, setNameClient] = useState('');
    const [valueCobranca, setValueCobranca] = useState('');
    const [vencimentoCobranca, setVencimentoCobranca] = useState('');
    const [descricaoCobranca, setDescricaoCobranca] = useState('')
    const [selectedOption, setSelectedOption] = useState();
    const [inputError, setInputError] = useState(false);

    let { id } = useParams();
    const { token } = useGlobal();
    const requests = useRequests();

    let valorFormatado = valueCobranca * 1000;

    if (!id) {
        id = charge.id;
    }

    useEffect(() => {
        if (token) {
            loadClientDetailOne();
        }
    }, []);

    async function loadClientDetailOne() {
        setClient(charge);
        setNameClient(charge.nomecliente);
        setValueCobranca(charge.valor / 1000);
        setVencimentoCobranca(format(new Date(charge.vencimento), "dd/MM/yyyy"));
        setDescricaoCobranca(charge.descricao);
        setSelectedOption(charge.statuscobranca);
    }

    async function handleSubmitCharge(event) {
        event.preventDefault();

        if (!descricaoCobranca || !vencimentoCobranca || vencimentoCobranca.indexOf('_') !== -1 || !valueCobranca) {
            setInputError(true);
            return;
        }

        let vencimentoArray = vencimentoCobranca.split('/');

        const body = {
            nomecliente: nameClient,
            valor: valorFormatado,
            vencimento: new Date(vencimentoArray[2], Number(vencimentoArray[1]) - 1, vencimentoArray[0]),
            descricao: descricaoCobranca,
            statuscobranca: selectedOption
        };

        const result = await requests.putEditCharge('cobrancas', body, client.id, true);
        const result2 = await requests.putStatusClient('clientes', body, client.cliente_id, true);

        if (result && result2) {
            popup.messageSuccessBlue('Cobrança Atualizada!');
            setopenCEdit(false);
        }
    }

    function verifySelectedOption() {
        if (selectedOption === "Pendente" || selectedOption === "Vencida") {

            let auxToday = new Date()
            auxToday.setHours(0);
            auxToday.setMinutes(0);
            auxToday.setSeconds(0);
            auxToday.setMilliseconds(0);

            let vencimentoArray = vencimentoCobranca.split('/');

            let auxTyped = new Date(vencimentoArray[2], Number(vencimentoArray[1]) - 1, vencimentoArray[0]);

            if (isBefore(auxTyped, auxToday)) {
                setSelectedOption('Vencida');
            } else {
                setSelectedOption('Pendente');
            }
        } else {
            setSelectedOption("Pago")
        }
    }

    function closeModal() {
        setopenCEdit(false);
    }

    return (
        <div className="modal-editCharge-backdrop" style={{ display: !openCEdit && 'none' }}>
            <div className="modal-editCharge-content">
                <img
                    className="modal-editCharge-close-icon"
                    src={CloseIcon}
                    alt="Fechar"
                    onClick={() => closeModal()}
                />
                <div className="modal-editCharge-title">
                    <img src={ChargeIcon} alt="Clientes" />
                    <h1>Edição De Cobrança</h1>
                </div>
                <form onSubmit={handleSubmitCharge}>
                    <div className="modal-editCharge-name w100w">

                        <label>Nome*</label>
                        <input
                            type="text"
                            placeholder="Digite o nome"
                            disabled
                            value={nameClient}
                        />
                        <p
                            className="mensagem-error"
                        >
                        </p>
                    </div>
                    <div className="modal-editCharge-description">
                        <label>Descrição*</label>
                        <textarea
                            style={inputError && !descricaoCobranca ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                            type="text"
                            placeholder="Digite a descrição"
                            value={descricaoCobranca}
                            onChange={(e) => setDescricaoCobranca(e.target.value)}
                        />
                        <p
                            style={inputError && !descricaoCobranca ? { display: "flex" } : { display: "none" }}
                            className="mensagem-error"
                        >
                            este campo é obrigatório
                        </p>
                    </div>
                    <div className='modal-editCharge-combined'>
                        <div className="modal-editCharge-form-inputs">
                            <label>Vencimento*</label>
                            <InputMask
                                style={inputError && !vencimentoCobranca || vencimentoCobranca.indexOf('_') !== -1 ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                                mask="99/99/9999"
                                type="text"
                                placeholder="Digita a data"
                                value={vencimentoCobranca}
                                onChange={(e) => setVencimentoCobranca(e.target.value)}
                            />
                            <p
                                style={inputError && !vencimentoCobranca || vencimentoCobranca.indexOf('_') !== -1 ? { display: "flex" } : { display: "none" }}
                                className="mensagem-error"
                            >
                                Este campo é obrigatório
                            </p>
                        </div>
                        <div className="modal-editCharge-form-inputs">
                            <label>Valor*</label>
                            <input
                                style={inputError && !valueCobranca ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                                type="number"
                                placeholder="Digite o Valor"
                                value={valueCobranca}
                                onChange={(e) => setValueCobranca(e.target.value)}
                            />
                            <p
                                style={inputError && !valueCobranca ? { display: "flex" } : { display: "none" }}
                                className="mensagem-error"
                            >
                                Este campo é obrigatório
                            </p>
                        </div>
                    </div>
                    <div className="modal-editCharge-status">
                        <label>Status*</label>
                        <div className=' position1'>
                            <input
                                className='input-style-charge'
                                type="radio"
                                id="statusPay"
                                name="drone"
                                value="Pago"
                                checked={selectedOption === "Pago" ? true : false}
                                onClick={() => setSelectedOption("Pago")}
                            />
                            <label className='modal-status-label label1' for="statusPay">Cobrança Paga</label>
                        </div>
                        <div>
                            <input
                                className='input-style-charge position2'
                                type="radio"
                                id="statusPeding"
                                name="drone"
                                value="Pendente"
                                checked={selectedOption !== "Pago" ? true : false}
                                onClick={() => setSelectedOption("Pendente")}
                            />
                            <label className='modal-status-label label2' for="statusPeding">Cobrança Pendente</label>
                        </div>
                    </div>
                    <div className="modal-editCharge-form-buttons">
                        <button className="mec-cancel"
                            onClick={() => closeModal()}>
                            Cancelar
                        </button>
                        <button
                            className="mec-apply" onClick={() => verifySelectedOption()}
                        >
                            Aplicar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditCharge;