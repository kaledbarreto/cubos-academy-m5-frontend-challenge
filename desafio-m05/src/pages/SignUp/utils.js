import imagemLateral01 from '../../assets/lateralCadastro-01.svg';
import imagemLateral02 from '../../assets/lateralCadastro-02.svg';
import imagemLateral03 from '../../assets/lateralCadastro-03.svg';
import barraBottom03 from '../../assets/statusHorizontalFinal.svg';
import barraBottom01 from '../../assets/statusHorizontalInicial.svg';
import barraBottom02 from '../../assets/statusHorizontalIntermediario.svg';

export function mudarBarraStatusLeft(senha, cadastro) {
    if (cadastro) {
        return imagemLateral01;
    }
    if (!cadastro && senha) {
        return imagemLateral02;
    }
    if (!cadastro && !senha) {
        return imagemLateral03;
    }
}

export function aparecerSenha(passwordType, setPasswordType) {
    if (passwordType) {
        setPasswordType(false);
        return;
    }
    setPasswordType(true);
}

export function aparecerRepeteSenha(passwordTypeRepit, setPasswordTypeRepit) {
    if (passwordTypeRepit) {
        setPasswordTypeRepit(false);
        return;
    }
    setPasswordTypeRepit(true);
}

export function mudarBarraStatusBotton(senha, cadastro) {
    if (cadastro) {
        return barraBottom01
    }
    if (!cadastro && senha) {
        return barraBottom02
    }
    if (!cadastro && !senha) {
        return barraBottom03
    }
}