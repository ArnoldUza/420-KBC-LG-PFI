import {
  createContext,
  useState
} from 'react';

export const CompteContext =
  createContext();

export function CompteProvider({
  children
}) {

  const [compte, setCompte] =
    useState(null);

  return (

    <CompteContext.Provider
      value={{
        compte,
        setCompte
      }}
    >

      {children}

    </CompteContext.Provider>
  );
}