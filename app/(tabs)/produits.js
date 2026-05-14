import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { getProduits } from '../bdSQLite';

export default function Produits() {
  const router = useRouter();
  const [produits, setProduits] = useState([]);

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
            <Text>{item.prix.toFixed(2)} $</Text>
          </Pressable>
        )}
      />
    </View>
  );  
}