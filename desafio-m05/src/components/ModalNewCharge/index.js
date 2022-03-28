import { isBefore } from 'date-fns';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useParams } from 'react-router-dom';
import CloseIcon from '../../assets/close-icon.svg';
import ChargeIcon from "../../assets/cobrancas-icon.svg";
import popup from '../../helpers/toast';
import useGlobal from "../../hooks/useGlobal";
import useRequests from '../../hooks/useRequest';
import './styles.css';

function ModalNewCharge({ openNCharge, setOpenNCharge, cliente }) {
    const [nameClient, setNameClient] = useState('');
    const [valueCobranca, setValueCobranca] = useState('');
    const [vencimentoCobranca, setVencimentoCobranca] = useState('');
    const [descricaoCobranca, setDescricaoCobranca] = useState('')
    const [selectedOption, setSelectedOption] = useState('Pago');
    const [inputValor, setInputValor] = useState(false);
    const [inputVencimento, setInputVencimento] = useState(false);
    const [inputDescricao, setInputDescricao] = useState(false);
    const [inputSelect, setInputSelect] = useState(false);

    let valorFormatado = valueCobranca * 1000;

    const requests = useRequests();
    let { id } = useParams();

    if (!id) {
        id = cliente.id;
    }

    const { token } = useGlobal();

    useEffect(() => {
        if (token) {
            loadClientDetailOne();
        }
    }, []);

    async function loadClientDetailOne() {
        const result = await requests.getOne('clientes', id);
        setNameClient(result.nome);
    }

    async function handleSubmitCharge(event) {
        event.preventDefault();

        if (!descricaoCobranca || !vencimentoCobranca || !valueCobranca) {
            setInputDescricao(true);
            setInputVencimento(true);
            setInputValor(true);
            return;
        }
        if (!selectedOption) {
            setInputSelect(true);
        }

        let vencimentoArray = vencimentoCobranca.split('/');

        const body = {
            nomecliente: nameClient,
            valor: valorFormatado,
            vencimento: new Date(vencimentoArray[2], Number(vencimentoArray[1]) - 1, vencimentoArray[0]),
            descricao: descricaoCobranca,
            statuscobranca: selectedOption
        };

        const result = await requests.postNewCharge('cobrancas', body, id, true);
        const result2 = await requests.putStatusClient('clientes', body, id, true);

        if (result && result2) {
            setOpenNCharge(false);
            popup.messageSuccessBlue('Cobrança Cadastrada!');
            closeModal();
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
        setDescricaoCobranca('');
        setVencimentoCobranca('');
        setValueCobranca('');
        setSelectedOption('Pago');
        setInputDescricao(false);
        setInputVencimento(false);
        setInputValor(false);
        setOpenNCharge(false);
    }


    return (
        <div className="modal-newcharge-backdrop" style={{ display: !openNCharge && 'none' }}>
            <div className="modal-newcharge-content">
                <img
                    className="modal-newcharge-close-icon"
                    src={CloseIcon}
                    alt="Fechar"
                    onClick={() => closeModal()}
                />
                <div className="modal-newcharge-title">
                    <img src={ChargeIcon} alt="Clientes" />
                    <h1>Cadastro De Cobrança</h1>
                </div>
                <form onSubmit={handleSubmitCharge}>
                    <div className="modal-newcharge-name w100w">
                        <label>Nome*</label>
                        <input
                            type="text"
                            placeholder="Digite o nome"
                            disabled
                            value={nameClient}
                        />
                    </div>
                    <div className="modal-newcharge-description">
                        <label>Descrição*</label>
                        <textarea
                            style={inputDescricao && !descricaoCobranca ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                            type="text"
                            placeholder="Digite a descrição"
                            value={descricaoCobranca}
                            onChange={(e) => setDescricaoCobranca(e.target.value)}
                        />
                        <p
                            style={inputDescricao && !descricaoCobranca ? { display: "flex" } : { display: "none" }}
                            className="mensagem-error"
                        >
                            Este campo é obrigatório.
                        </p>
                    </div>
                    <div className='modal-newcharge-combined'>
                        <div className="modal-newcharge-form-inputs">
                            <label>Vencimento*</label>
                            <InputMask
                                style={inputVencimento && !vencimentoCobranca || vencimentoCobranca.indexOf('_') !== -1 ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                                mask="99/99/9999"
                                type="text"
                                placeholder="Digita a data"
                                value={vencimentoCobranca}
                                onChange={(e) => setVencimentoCobranca(e.target.value)}
                            />
                            <p
                                style={inputVencimento && !vencimentoCobranca || vencimentoCobranca.indexOf('_') !== -1 ? { display: "flex" } : { display: "none" }}
                                className="mensagem-error"
                            >
                                Este campo é obrigatório
                            </p>
                        </div>
                        <div className="modal-newcharge-form-inputs number1">
                            <label>Valor*</label>
                            <input
                                style={inputValor && !valueCobranca ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                                type="number"
                                placeholder="Digite o Valor"
                                value={valueCobranca}
                                onChange={(e) => setValueCobranca(e.target.value)}
                            />
                            <p
                                style={inputValor && !valueCobranca ? { display: "flex" } : { display: "none" }}
                                className="mensagem-error"
                            >
                                Este campo é obrigatório
                            </p>
                        </div>
                    </div>
                    <div className="modal-newcharge-status">
                        <label>Status*</label>
                        <div lassName=' position1'>
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
                        <p
                            style={inputSelect ? { display: "flex" } : { display: "none" }}
                            className="mensagem-error"
                        >
                            Este campo é obrigatório
                        </p>
                    </div>
                    <div className="modal-newcharge-form-buttons">
                        <span className="mec-cancel"
                            onClick={() => closeModal()}>
                            Cancelar
                        </span>
                        <button
                            onClick={() => verifySelectedOption()}
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

export default ModalNewCharge;