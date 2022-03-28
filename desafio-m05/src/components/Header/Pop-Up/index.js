import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import editar from "../../../assets/PopUpEdit.svg";
import sair from "../../../assets/PopUpOut.svg";
import topSide from "../../../assets/PopUpTop.svg";
import useGlobal from "../../../hooks/useGlobalProvider";
import ModalConfirmEdit from "../../ModalConfirmEdit";
import ModalEditUser from "../../ModalEditUser";
import "./style.css";

function Popup({ buscarNomeUser }) {
  const { removeToken, openAddEditModal, setOpenAddEditModal, openModalComfirm, setOpenModalComfirm } = useGlobal();
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      buscarNomeUser();
      setOpenModalComfirm(false);
    }, 3500);

    return () => {
      clearTimeout(timeout);
    }
  }, [openModalComfirm]);


  function handleLogOut() {
    removeToken();
    history.go(0);
  }

  function abrirModaledit() {
    setOpenAddEditModal(true);
  }

  return (
    <>
      <div className="popup" >
        <div className="popup-top">
          <img src={topSide} alt="" />
        </div>
        <img className="icon" src={editar} alt="" onClick={() => abrirModaledit()} />
        <img className="icon" src={sair} alt="" onClick={() => handleLogOut()} />
      </div>
      <div>
        <ModalEditUser
          open={openAddEditModal}
          setOpen={setOpenAddEditModal}
          setOpenModalComfirm={setOpenModalComfirm}
        />
        <ModalConfirmEdit
          setOpenModalComfirm={setOpenModalComfirm}
          openModalComfirm={openModalComfirm}
        />
      </div>
    </>
  );
};

export default Popup;