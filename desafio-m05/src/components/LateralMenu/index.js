import { useHistory } from "react-router";
import FileGray from "../../assets/FileGray.svg";
import FilePink from "../../assets/FilePink.svg";
import HomeGray from "../../assets/HomeGray.svg";
import HomePink from "../../assets/HomePink.svg";
import UserGray from "../../assets/UserGray.svg";
import UserPink from "../../assets/UserPink.svg";
import "./style.css";

function LateralMenu() {
    const CurrentPage = window.location.pathname;

    const history = useHistory();
    return (
        <div className="lateral-menu nav-bar">
            <div className="itens-nav">
                <div
                    className={`${CurrentPage === "/home" ? "new-button" : "button-nav"}`}
                    onClick={() => history.push("/home")}
                >
                    <img
                        width="42px"
                        src={CurrentPage === "/home" ? HomePink : HomeGray}
                        alt=""
                    />
                    <p>Home</p>
                </div>
                <div
                    className={`${CurrentPage.includes("/clientes") ? "new-button" : "button-nav"
                        }`}
                    onClick={() => history.push("/clientes")}
                >
                    <img
                        width="42px"
                        src={CurrentPage.includes("/clientes") ? UserPink : UserGray}
                        alt=""
                    />
                    <p>Clientes</p>
                </div>
                <div
                    className={`${CurrentPage === "/cobrancas" ? "new-button" : "button-nav"
                        }`}
                    onClick={() => history.push("/cobrancas")}
                >
                    <img
                        width="42px"
                        src={CurrentPage === "/cobrancas" ? FilePink : FileGray}
                        alt=""
                    />
                    <p>Cobranças</p>
                </div>
            </div>
        </div>
    );
}

export default LateralMenu;