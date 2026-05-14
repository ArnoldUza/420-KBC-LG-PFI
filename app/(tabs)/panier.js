import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { useContext, useState } from 'react';
import { PanierContext } from '../../context/panierContext';
import { Modal } from 'react-native';
import { LangueContext } from '../../context/langueContext';

export default function Panier() {
  const { panier, setPanier } = useContext(PanierContext);

  const [soustraitReussi, setSoustraitReussi] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const { langue, setLangue } = useContext(LangueContext);

  const viderPanier = () => {
    setPanier([]);
    setSoustraitReussi('Panier vidé avec succès');
  };

  const formaterPrix = (prix) => {
    if (langue === 'en') return `$ ${prix.toFixed(2)}`;
    return `${prix.toFixed(2)} $`;
  };

  return (
    <View style={styles.container}>
    
        <Text style={styles.titre}>Panier</Text>

        <FlatList
            data={panier}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View>
                    <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                    <Text>{item.nom}</Text>
                    <Text>Quantité: {item.quantite}</Text>
                    <Text>{formaterPrix(item.prix)}</Text>
                    <Text>Total: {formaterPrix(item.prix * item.quantite)}</Text>
                </View>
            )}
        />

        <Text style={styles.total}>
            Total: {formaterPrix(panier.reduce((total, item) => total + (item.prix * item.quantite), 0))}
        </Text>

        <Pressable style={styles.button} onPress={() => {
            viderPanier();
        }}>
            <Text style={styles.buttonText}>Vider le panier</Text>
        </Pressable>
        {soustraitReussi && <Text style={styles.messageSucces}>{soustraitReussi}</Text>}

        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Passer à la caisse</Text>
        </Pressable>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);     
            }}
        >
            <View style={styles.modalSuperposition}>      
                <View style={styles.modalContenu}>
                    <Text style={styles.modalTitre}>Merci pour votre achat !</Text>
                    <Pressable style={styles.button} onPress={() => {
                        setModalVisible(false);
                        viderPanier();
                    }}>
                        <Text style={styles.buttonText}>Fermer</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
        
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
  container: {
    flex: 1,
    padding: 16,
  },
  titre: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  total: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageSucces: {
    color: 'green',
    marginTop: 10,
  },
  modalSuperposition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContenu: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});