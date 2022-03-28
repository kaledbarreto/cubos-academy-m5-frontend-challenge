import SearchClient from "../../assets/SearchClient.svg";
import SearchLens from "../../assets/SearchLens.svg";
import "./styles.css";

function ModalSearchUndefined({ openSUndefined, setOpenSUndefined }) {
    return (
        <div className="backdrop4">
            <div className="modal-content4">
                <img className="searchClient" src={SearchClient} alt="" />
                <img
                    className="searchIcon"
                    src={SearchLens}
                    alt="Fechar"
                    onClick={() => setOpenSUndefined(false)}
                />
                <div className="title-modal4">
                    <h1>Nenhum resultado foi encontrado!</h1>
                    <h2>Verifique se escrita está correta</h2>
                </div>
            </div>
        </div>
    )
}

export default ModalSearchUndefined;