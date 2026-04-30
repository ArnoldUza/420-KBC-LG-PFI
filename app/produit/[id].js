import { View, Text, Image, Pressable,StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import produits from '../(tabs)/produits.json';
    

export default function Produit() {
  const { id } = useLocalSearchParams();
  const produit = produits.find(p => p.id === parseInt(id));    
    if (!produit) { 
        return (
            <View>
                <Text>Produit non trouvé</Text>
            </View>
        );
    }       
    return (
        <View style={{ flex: 1, padding: 16 }}> 
            <Image source={{ uri: produit.image }} style={{ width: 200, height: 200 }} />
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{produit.nom}</Text>
            <Text style={{ fontSize: 18, color: '#888' }}>{produit.prix.toFixed(2)} $</Text>        
            <Text style={{ marginTop: 16 }}>{produit.description}</Text>

            <Pressable style={styles.button} >
                <Text 
                    style={styles.buttonText}>Ajouter au panier
                </Text>
            </Pressable>
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});