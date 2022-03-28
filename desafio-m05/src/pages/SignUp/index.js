import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import iconcadastroOk from '../../assets/iconCadastroOk.svg';
import olhoAberto from '../../assets/olho-aberto.svg';
import olhoFechado from '../../assets/olho-fechado.svg';
import popup from '../../helpers/toast';
import useRequests from '../../hooks/useRequest';
import './styles.css';
import { aparecerRepeteSenha, aparecerSenha, mudarBarraStatusBotton, mudarBarraStatusLeft } from './utils';

function SignUp() {
    const [cadastro, setCadastro] = useState(true);
    const [senha, setSenha] = useState(true);
    const [passwordType, setPasswordType] = useState(true);
    const [passwordTypeRepit, setPasswordTypeRepit] = useState(true);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const requests = useRequests();

    useEffect(() => {
        if (!cadastro && !senha) {
            const timeout = setTimeout(() => {
                window.location.reload();
            }, 2000);

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [cadastro, senha]);

    function proximaParteDoForm() {
        if (!name || !email) {
            popup.messageError("Todos os campos são obrigatórios");
            setCadastro(true);
            return
        } if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
            setCadastro(true);
            popup.messageError("Email deve estar no formato. Ex: exemplo@exemplo.com");
            return
        }
        setCadastro(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!email || !name || !password) {
            return;
        }

        if (password !== confirmPassword) {
            popup.messageError("As senhas não conferem!");
            return;
        }

        const body = {
            nome: name,
            email: email,
            senha: password,
            cpf: '',
            telefone: ''
        };

        const result = await requests.post('usuarios', body);

        if (result) {
            setCadastro(false);
            setSenha(false);
        }

    }

    return (
        <div className="signup-main">
            <div
                style={{ backgroundImage: `url(${mudarBarraStatusLeft(senha, cadastro)})` }}
                className="left"
            >
            </div>
            <div className="right">
                <div
                    className="cadastro-ok"
                    style={cadastro || senha ? { display: 'none' } : { display: 'flex' }}
                >
                    <div className="body-cadastro-ok">
                        <img src={iconcadastroOk} alt="cadastro ok" />
                        <span>Cadastro realizado com sucesso!</span>
                    </div>
                    <button
                    >
                        <Link className="cadastro-finalizado" to="/sign-in">Ir para Login</Link>
                    </button>

                </div>
                <div
                    style={!cadastro && !senha ? { display: 'none' } : { display: 'flex' }}
                    className="form-cadastro"
                >
                    <h1>{cadastro ? "Adicione Seus Dados" : "Escolha uma senha"}</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label
                                style={!cadastro ? { display: 'none' } : { display: 'flex' }}
                            >
                                Nome
                            </label>
                            <input
                                style={!cadastro ? { display: 'none' } : { display: 'flex' }}
                                placeholder="Digite seu nome"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label
                                style={!cadastro ? { display: 'none' } : { display: 'flex' }}
                            >
                                Email
                            </label>
                            <input
                                style={!cadastro ? { display: 'none' } : { display: 'flex' }}
                                required
                                placeholder="Digite seu e-mail"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label
                                style={cadastro ? { display: 'none' } : { display: 'flex' }}
                            >
                                Senha
                            </label>
                            <div className="input-senha">
                                <input
                                    style={cadastro ? { display: 'none' } : { display: 'flex' }}
                                    placeholder="Digite sua senha"
                                    type={passwordType ? "password" : "text"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <img
                                    id="olho-senha"
                                    onClick={() => aparecerSenha(passwordType, setPasswordType)}
                                    className={`olho ${cadastro ? "hidden" : ""}`}
                                    src={passwordType ? olhoFechado : olhoAberto} alt="olho"
                                />
                            </div>
                            <label
                                style={cadastro ? { display: 'none' } : { display: 'flex' }}
                            >
                                Repita a senha
                            </label>
                            <div className="input-senha">
                                <input
                                    style={cadastro ? { display: 'none' } : { display: 'flex' }}
                                    placeholder="Digite sua senha"
                                    type={passwordTypeRepit ? "password" : "text"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <img
                                    id="olho-repitasenha"
                                    onClick={() => aparecerRepeteSenha(passwordTypeRepit, setPasswordTypeRepit)}
                                    className={`olho ${cadastro ? "hidden" : ""}`}
                                    src={passwordTypeRepit ? olhoFechado : olhoAberto} alt="olho"
                                />
                            </div>
                        </div>
                        <button
                            style={cadastro ? { display: 'none' } : { display: 'flex' }}
                        >
                            Entrar
                        </button>
                    </form>
                    <button
                        style={!cadastro ? { display: 'none' } : { display: 'flex' }}
                        onClick={() => proximaParteDoForm()}
                    >
                        Continuar
                    </button>
                    <div>
                        <span>Já possui uma conta? Faça seu </span><Link to="/sign-in"> login!</Link>
                    </div>
                </div>
                <img
                    className="status-botton"
                    src={mudarBarraStatusBotton(senha, cadastro)}
                    alt="barra de status botton"
                />
            </div>
        </div>
    )
}

export default SignUp;