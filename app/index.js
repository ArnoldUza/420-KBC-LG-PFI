import {Text, View, TextInput, Pressable, StyleSheet, Image} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [nomUtilisateur, setNomUtilisateur] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');

  const handleConnexion = () => {
    
    if (nomUtilisateur === '' || motDePasse === '') {
      setErreur('Veuillez remplir tous les champs');
    } else if (nomUtilisateur === 'admin' && motDePasse === 'motdepasse') {
      router.push('/(tabs)/produits');
    } else {
      setErreur('Nom d\'utilisateur ou mot de passe incorrect');
    } 
    
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.titre}>La Bulle</Text>
        <Image 
          source={require('../assets/Shonen-Jump-Marvel.webp')} 
          style={styles.image}
        />
        <Text style={styles.soutitre}>Bandes Dessinées</Text>
      </View>

      <View style={styles.forme}>
        <TextInput style={styles.input} placeholder="Nom d'utilisateur" onChangeText={setNomUtilisateur} />
        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} onChangeText={setMotDePasse} />
        {erreur !== '' && <Text style={styles.erreur}>{erreur}</Text>}
        <Pressable style={styles.button} onPress={handleConnexion}>
          <Text 
            style={styles.buttonText}>Se connecter
          </Text>
        </Pressable>
      </View>

      <Text style={styles.noms}>Arnold - Massine</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'space-between', 
    padding: 24, 
    backgroundColor: '#f7f4ef'
  },
  titre: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  soutitre: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#888',
    marginBottom: 20,
  },
  top: {
    marginTop: 80,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#9e8dd7', 
    padding: 14, 
    borderRadius: 10, 
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noms: {
    textAlign: 'center', 
    color: '#292727', 
    fontSize: 12, 
    marginBottom: 12
  },
  forme: {
    gap: 10,
  },
  image: {
  width: 250,
  height: 250,
  marginTop: 20,
  resizeMode: 'contain',
}
});