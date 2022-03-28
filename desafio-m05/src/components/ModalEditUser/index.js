import { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import CloseIcon from '../../assets/close-icon.svg';
import olhoAberto from '../../assets/olho-aberto.svg';
import olhoFechado from '../../assets/olho-fechado.svg';
import useGlobal from "../../hooks/useGlobal";
import useRequests from '../../hooks/useRequest';
import "./style.css";

function ModalEditUser({ open, setOpen, setOpenModalComfirm }) {
    const [senhaHidden, setSenhaHidden] = useState(true);
    const [confirmSenhaHidden, setConfirmSenhaHidden] = useState(true);
    const [nomeEdit, setNomeEdit] = useState('');
    const [emailEdit, setEmailEdit] = useState('');
    const [cpfEdit, setCpfEdit] = useState('');
    const [telefoneEdit, setTelefoneEdit] = useState('');
    const [senhaEdit, setSenhaEdit] = useState('');
    const [confSenhaEdit, setConfSenhaEdit] = useState('');
    const [inputError, setInputError] = useState(false);

    const requests = useRequests();
    const { token } = useGlobal();

    useEffect(() => {
        if (token) {
            populandoModalEditUser();
        }
    }, []);

    async function populandoModalEditUser() {
        const result = await requests.get('usuarios');
        const { nome, email, cpf, telefone } = result;
        setNomeEdit(nome);
        setEmailEdit(email);
        setCpfEdit(cpf);
        setTelefoneEdit(telefone);
    }

    async function handleEdit(event) {
        event.preventDefault();

        if (!nomeEdit || !emailEdit || telefoneEdit.indexOf('_') !== -1 || cpfEdit.indexOf('_') !== -1 || senhaEdit !== confSenhaEdit) {
            setInputError(true);
            return;
        }

        const bodyEdit = ({
            nome: nomeEdit,
            email: emailEdit,
            cpf: cpfEdit,
            telefone: telefoneEdit,
            senha: senhaEdit
        })

        const result = await requests.put("usuarios", bodyEdit, token);

        if (result) {
            closeModal();
            setOpenModalComfirm(true);
        }
    }

    function aparecerSenha() {
        if (senhaHidden) {
            setSenhaHidden(false);
            return;
        }
        setSenhaHidden(true);
    }

    function aparecerConfirmSenha() {
        if (confirmSenhaHidden) {
            setConfirmSenhaHidden(false);
            return;
        }
        setConfirmSenhaHidden(true);
    }

    function closeModal() {
        setOpen(false);
        setInputError(false);
        setSenhaEdit('');
        setConfSenhaEdit('');
        populandoModalEditUser();
    }

    return (
        <div className="backdrop10" style={{ display: !open && 'none' }}>
            <div className="modal-content10">
                <img
                    className="close-icon10"
                    src={CloseIcon}
                    alt="Fechar"
                    onClick={() => closeModal()}
                />
                <div className="title-modal10">

                    <h1>Edite Seu Cadastro</h1>
                </div>
                <form onSubmit={handleEdit}>
                    <div className="form-inputs10 w100w">
                        <label>Nome*</label>
                        <input
                            type="text"
                            placeholder="Digite o nome"
                            style={inputError && !nomeEdit ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                            value={nomeEdit}
                            onChange={(e) => setNomeEdit(e.target.value)}
                        />
                        <p
                            style={inputError && !nomeEdit ? { display: "flex" } : { display: "none" }}
                            className="mensagem-error"
                        >
                            Este campo deve ser preenchido
                        </p>
                    </div>
                    <div className="form-inputs10 w100w">
                        <label>E-mail*</label>
                        <input
                            type="text"
                            placeholder="Digite o e-mail"
                            style={inputError && !emailEdit ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                            value={emailEdit}
                            onChange={(e) => setEmailEdit(e.target.value)}
                        />
                        <p
                            style={inputError && !emailEdit ? { display: "flex" } : { display: "none" }}
                            className="mensagem-error"
                        >
                            Este campo deve ser preenchido
                        </p>
                    </div>
                    <div className="combined-inputs10">
                        <div className="form-inputs10">
                            <label>CPF</label>
                            <InputMask
                                mask="999.999.999-99"
                                placeholder="Digite o CPF"
                                style={cpfEdit.indexOf('_') !== -1 ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                                value={cpfEdit}
                                onChange={(e) => setCpfEdit(e.target.value)}
                            />
                            <p
                                style={cpfEdit.indexOf('_') !== -1 ? { display: "flex" } : { display: "none" }}
                                className="mensagem-error"
                            >
                                O cpf deve conter exatamente 11 caracteres
                            </p>
                        </div>
                        <div className="form-inputs10">
                            <label>Telefone</label>
                            <InputMask
                                mask="(99) 99999-9999"
                                placeholder="Digite o Telefone"
                                style={telefoneEdit.indexOf('_') !== -1 ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                                value={cpfEdit}
                                value={telefoneEdit}
                                onChange={(e) => setTelefoneEdit(e.target.value)}
                            />
                            <p
                                style={telefoneEdit.indexOf('_') !== -1 ? { display: "flex" } : { display: "none" }}
                                className="mensagem-error"
                            >
                                Telefone inválido
                            </p>
                        </div>
                    </div>
                    <div className="form-cadastro10">
                        <label>
                            Nova Senha
                        </label>
                        <div className="input-senha10 ">
                            <input
                                placeholder="Digite sua senha"
                                type={senhaHidden ? "password" : "text"}
                                style={inputError && senhaEdit !== '' || inputError && confSenhaEdit !== '' ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                                value={senhaEdit}
                                onChange={(e) => setSenhaEdit(e.target.value)}
                            />

                            <img
                                onClick={() => aparecerSenha()}
                                className='olho10'
                                src={senhaHidden ? olhoFechado : olhoAberto} alt="olho"
                            />
                        </div>
                        <label

                        >
                            Confirmar Senha
                        </label>
                        <div className="input-senha10">
                            <input
                                placeholder="Digite sua senha"
                                type={confirmSenhaHidden ? "password" : "text"}
                                style={inputError && senhaEdit !== '' || inputError && confSenhaEdit !== '' ? { border: "1px solid #E70000" } : { border: "1px solid #D0D5DD" }}
                                value={confSenhaEdit}
                                onChange={(e) => setConfSenhaEdit(e.target.value)}
                            />
                            <img
                                onClick={() => aparecerConfirmSenha()}
                                className='olho10'
                                src={confirmSenhaHidden ? olhoFechado : olhoAberto} alt="olho"
                            />
                        </div>
                        <p
                            style={inputError && senhaEdit !== '' || inputError && confSenhaEdit !== '' ? { display: "flex" } : { display: "none" }}
                            className="mensagem-error"
                        >
                            A senhas não são iguais
                        </p>
                    </div>
                    <div className="form-buttons10">
                        <button className="apply10">Aplicar</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ModalEditUser;