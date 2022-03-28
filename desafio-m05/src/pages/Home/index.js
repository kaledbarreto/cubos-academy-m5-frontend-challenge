import CardCobranca from "../../components/CardCobranca";
import Header from "../../components/Header";
import LateralMenu from "../../components/LateralMenu";
import TabelaHomeCliente from "../../components/TabelaHomeCliente";
import TabelaHomeCobranca from "../../components/TabelaHomeCobranca";
import useGlobal from '../../hooks/useGlobal';
import "./style.css";

function Home() {
  const { token } = useGlobal();

  return (
    <>
      {
        token && <div className="home">
          <LateralMenu />
          <Header />
          <section className="home-section">
            <section className="home-section-container">
              <section className="home-section-1">
                <div className="container-pay">
                  <CardCobranca pay title="Cobranças Pagas" />
                  <TabelaHomeCobranca
                    pay
                  />
                </div>
                <div className="container-unsucceful">
                  <CardCobranca unsucceful title="Cobranças Vencidas" />
                  <TabelaHomeCobranca
                    unsucceful
                  />
                </div>
                <div className="container-preview">
                  <CardCobranca preview title="Cobranças Previstas" />
                  <TabelaHomeCobranca
                    preview
                  />
                </div>
              </section>
              <section className="home-section-2">
                <TabelaHomeCliente emDia />
                <TabelaHomeCliente inadimplentes />
              </section>
            </section>
          </section>
        </div>
      }
    </>
  );
}
export default Home;
