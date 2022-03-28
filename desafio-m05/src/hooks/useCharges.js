import { useContext } from 'react';
import ChargesContext from '../context/ChargesContext';

function useCharges() {
  return useContext(ChargesContext);
}

export default useCharges;