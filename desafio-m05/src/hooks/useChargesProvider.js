import { useEffect, useState } from 'react';
import useRequests from './useRequest';
import useGlobal from './useGlobal';

function useChargesProvider() {
  const requests = useRequests();
  const [user, setUser] = useState([]);
  const { token } = useGlobal();

  useEffect(() => {
    if (token) {
      loadUserData();
    }

  }, []);

  async function loadUserData() {
    const result = await requests.get('usuarios');
    setUser(result);
  }

  return {
    user: user,
    loadUserData: loadUserData
  }
}

export default useChargesProvider;