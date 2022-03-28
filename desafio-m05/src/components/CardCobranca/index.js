import { useEffect, useState } from 'react';
import payImg from "../../assets/ImgPay.svg";
import previewImg from "../../assets/ImgPreview.svg";
import unsuccefulImg from "../../assets/ImgUnsucceful.svg";
import useGlobal from '../../hooks/useGlobal';
import useRequests from '../../hooks/useRequest';
import "./style.css";

function CardCobranca({ preview, pay, title, unsucceful }) {
  const { token } = useGlobal();
  const requests = useRequests();
  const [cobrancas, setCobrancas] = useState([]);

  let cobPagas = cobrancas.filter(function (cobranca) {
    if (cobranca.statuscobranca.toLowerCase() === "pago") {
      return cobranca;
    }
  });

  let cobVencidas = cobrancas.filter(function (cobranca) {
    if (cobranca.statuscobranca.toLowerCase() === "vencida") {
      return cobranca;
    }
  });

  let cobPrevistas = cobrancas.filter(function (cobranca) {
    if (cobranca.statuscobranca.toLowerCase() === "pendente") {
      return cobranca;
    }
  });

  function somaDosValores(cobranca) {
    let soma = 0;

    for (let i = 0; i < cobranca.length; i++) {
      let valorCobranca = parseInt(cobranca[i].valor)
      soma += valorCobranca / 1000;
    }
    return "R$ " + soma;
  }

  useEffect(() => {
    if (token) {
      loadCobrancas();
    }
  }, []);

  async function loadCobrancas() {
    const result = await requests.get('cobrancas');
    setCobrancas(result)
  }

  return (
    <div
      className="resume resume-preview"
      style={{ backgroundColor: pay ? "#eef6f6" : preview ? "#fcf6dc" : "#ffefef", }}>
      <img src={pay ? payImg : preview ? previewImg : unsuccefulImg}
        className="resume-img"
        alt=""
      />
      <div className="resume-container">
        <h1 className="resume-title">{title}</h1>
        <span className="resume-value">
          {pay && somaDosValores(cobPagas)}
          {unsucceful && somaDosValores(cobVencidas)}
          {preview && somaDosValores(cobPrevistas)}
        </span>
      </div>
    </div>
  );
}
export default CardCobranca;