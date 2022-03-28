import { toast } from 'react-toastify';

function messageSuccessBlue(mensagem) {
  toast.info(mensagem, {
    position: "bottom-right",
    autoClose: 5000,
    theme: 'colored',
    closeOnClick: true,
    pauseOnHover: false
  });
}

function messageError(mensagem) {
  toast.error(mensagem, {
    position: "bottom-right",
    autoClose: 5000,
    theme: 'colored',
    closeOnClick: true,
    pauseOnHover: false
  });
}

export default { messageError, messageSuccessBlue };