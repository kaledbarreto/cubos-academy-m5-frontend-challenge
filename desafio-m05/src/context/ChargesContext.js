import { createContext } from 'react';
import useChargesProvider from '../hooks/useChargesProvider';

const ChargesContext = createContext();

export function ChargesProvider(props) {
  const chargesProvider = useChargesProvider();

  return (
    <ChargesContext.Provider value={chargesProvider}>
      {props.children}
    </ChargesContext.Provider>
  )
}

export default ChargesContext;