import {Text, View, TextInput, Pressable, StyleSheet, Image} from 'react-native';


export default function Home() {
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
        <TextInput style={styles.input} placeholder="Nom d'utilisateur"/>
        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true}/>
        
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Se connecter</Text>
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