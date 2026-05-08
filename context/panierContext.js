import { useState, createContext  } from 'react';

export const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
    const [panier, setPanier] = useState([]);

    return (
        <PanierContext.Provider value={{ panier, setPanier }}>
            {children}
        </PanierContext.Provider>
    );
}