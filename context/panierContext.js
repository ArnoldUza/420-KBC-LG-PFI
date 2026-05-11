import { useState, createContext  } from 'react';

export const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
    const [panier, setPanier] = useState([]);

    const ajouterAuPanier = (produit) => {
        const existe = panier.find(item => item.id === produit.id);
        if (existe) {
            setPanier(panier.map(item => 
                item.id === produit.id ? { ...item, quantite: item.quantite + 1 } : item
            ));
        } else {  
            setPanier([...panier, { ...produit, quantite: 1 }]);
        }
    }

    return (
        <PanierContext.Provider value={{ panier, setPanier, ajouterAuPanier }}>
            {children}
        </PanierContext.Provider>
    );
}