import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { useContext } from 'react';
import { PanierContext } from '../../context/panierContext';

export default function Panier() {
  const { panier } = useContext(PanierContext);

  return (
    <View>
        <Text>Panier</Text>
        <FlatList
            data={panier}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View>
                    <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                    <Text>{item.nom}</Text>
                    <Text>{item.prix.toFixed(2)} $</Text>
                </View>
            )}
        />
    </View>
  );
}