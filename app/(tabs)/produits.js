import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { getProduits } from '../bdSQLite';
import { LangueContext } from '../../context/langueContext';

export default function Produits() {
  const router = useRouter();
  const [produits, setProduits] = useState([]);

  const { langue, setLangue } = useContext(LangueContext);

  const formaterPrix = (prix) => {
    if (langue === 'en') return `$ ${prix.toFixed(2)}`;
    return `${prix.toFixed(2)} $`;
  };

  useEffect(() => {
    const fetchProduits = async () => {
      const produitsData = await getProduits();
      setProduits(produitsData);
    };

    fetchProduits();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Produits</Text>
      <FlatList
        data={produits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/produit/${item.id}`)}>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>{item.nom}</Text>
            <Text>{formaterPrix(item.prix)}</Text>
          </Pressable>
        )}
      />
    </View>
  );  
}