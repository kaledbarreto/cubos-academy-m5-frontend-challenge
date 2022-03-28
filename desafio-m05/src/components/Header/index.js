import "./style.css";
import TitleHeader from "./TitleHeader";
import User from "./User";

function Header() {
    return (
        <><div className="header">
            <TitleHeader />
            <User />
        </div>
        </>
    );
}

export default Header;