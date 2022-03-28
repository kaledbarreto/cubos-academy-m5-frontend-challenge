import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

function useGlobalProvider() {
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [currentClient, setCurrentClient] = useState(false);
  const [token, setToken, removeToken] = useLocalStorage('token', '');
  const [openModalComfirm, setOpenModalComfirm] = useState(false);

  useEffect(() => {
    if (!openAddEditModal) {
      setCurrentClient(false);
    }
  }, [openAddEditModal])

  return {
    openAddEditModal,
    setOpenAddEditModal,
    openModalComfirm,
    setOpenModalComfirm,
    currentClient: currentClient,
    setCurrentClient: setCurrentClient,
    token,
    setToken,
    removeToken
  }
}

export default useGlobalProvider;