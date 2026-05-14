import { useState, createContext  } from 'react';

export const LangueContext = createContext();

export const LangueProvider = ({ children }) => {
    const [langue, setLangue] = useState('fr');

    return (
        <LangueContext.Provider value={{ langue, setLangue }}>
            {children}
        </LangueContext.Provider>
    );
}