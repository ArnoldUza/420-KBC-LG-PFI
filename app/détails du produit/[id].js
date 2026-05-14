import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import produits from '../(tabs)/produits.json';
import { Stack } from 'expo-router';
import { useContext, useState, useEffect } from 'react';
import { PanierContext } from '../../context/panierContext';
import { getProduits } from '../bdSQLite';
import { CompteContext } from '../../context/compteContext';

export default function Produit() {
  const { compte } = useContext(CompteContext);

  const { panier, setPanier, ajouterAuPanier } = useContext(PanierContext);
  const { id } = useLocalSearchParams();
  const [ajoutReussi, setAjoutReussi] = useState('');

  const [produit, setProduit] = useState(null);

  useEffect(() => {
    const fetchProduit = async () => {
      const produitsData = await getProduits();
      const foundProduit = produitsData.find(p => p.id === parseInt(id));
      setProduit(foundProduit);
    };

    fetchProduit();
  }, [id]);

  if (!produit) {
    return (
      <View>
        <Text>Produit non trouvé</Text>
      </View>
    );
  }

  
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Stack.Screen options={{ title: "Page de détails" }} />
      <Image source={{ uri: produit.image }} style={{ width: 200, height: 200 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{produit.nom}</Text>
      <Text style={{ fontSize: 18, color: '#888' }}>{produit.prix.toFixed(2)} $</Text>
      <Text style={{ marginTop: 16 }}>{produit.description}</Text>

      {
        compte?.admin === 0 && (
          <Pressable
            style={styles.button}
            onPress={() => {
              ajouterAuPanier(produit);

              setAjoutReussi(
                'Produit ajouté au panier'
              );
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Ajouter au panier</Text>
          </Pressable>
        )
      }
      {ajoutReussi && <Text style={{ color: 'green', marginTop: 10 }}>{ajoutReussi}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
});