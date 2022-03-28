import { useState } from 'react';
import ProfileArrowIcon from '../../../../assets/profileArrow-icon.svg';
import Popup from '../../Pop-Up';

function ButtonAbrirPopUp({ buscarNomeUser }) {
    const [openPopup, setOpenPopup] = useState(false);

    function handleOpenPopup() {
        if (openPopup === true) {
            setOpenPopup(false);
        }
        else {
            setOpenPopup(true);
        }
    }

    return (
        <div>
            <img className="user-modal" src={ProfileArrowIcon} alt="Profile Arrow" onClick={() => handleOpenPopup()} />
            {openPopup ? <Popup
                buscarNomeUser={buscarNomeUser}
            /> : null}
        </div>
    )
}

export default ButtonAbrirPopUp;




