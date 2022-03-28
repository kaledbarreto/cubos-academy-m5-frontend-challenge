import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import popup from '../../helpers/toast';
import useGlobal from '../../hooks/useGlobal';
import useRequests from '../../hooks/useRequest';
import './styles.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { token, setToken } = useGlobal();
    const requests = useRequests();
    const history = useHistory();

    useEffect(() => {
        if (token) {
            history.push('/home');
        }
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();

        if (!email || !password) {
            popup.messageError("Email ou senha incorretos!");
            return;
        }

        const body = { email: email, senha: password };

        const result = await requests.post('loginusuario', body);

        if (result) {
            setToken(result.token);
            history.push('/home');
        }
    }

    return (
        <div className="signin-main">
            <div className="left">
            </div>
            <div className="right">
                <div className="form-login">
                    <h1>Faça seu login!</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="body-form">
                            <label>Email</label>
                            <input
                                placeholder="Digite seu e-mail"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Link className=" new-senha" to="/sign-in">Esqueceu a senha?</Link>
                            <label>Senha</label>
                            <input
                                placeholder="Digite sua senha"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="button">Entrar</button>
                    </form>

                    <div>
                        <span>Ainda não possui uma conta? </span><Link to="/sign-up">Cadastre-se</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignIn;