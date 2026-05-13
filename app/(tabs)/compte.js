import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { ajouterCompte } from '../bdSQLite';
import { useRouter } from 'expo-router';

export default function Compte() {
  const router = useRouter();

  const [motDePasse, setMotDePasse] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [messageErreur, setMessageErreur] = useState('');
  const [messageSucces, setMessageSucces] = useState('');
  const [adresse, setAdresse] = useState('');
  const [langue, setLangue] = useState('fr');

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Compte</Text>
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} onChangeText={setMotDePasse} />
      <TextInput style={styles.input} placeholder="Nom" onChangeText={setNom} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Adresse" onChangeText={setAdresse} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 }}>
        <Pressable
          style={langue === 'fr' ? styles.boutonActif : styles.bouton}
          onPress={() => { setLangue('fr') }}>
          <Text style={styles.buttonText}>[Fr]</Text>
        </Pressable>

        <Pressable
          style={langue === 'en' ? styles.boutonActif : styles.bouton}
          onPress={() => { setLangue('en') }}>
          <Text style={styles.buttonText}>[En]</Text>
        </Pressable>

        <Pressable
          style={langue === 'auto' ? styles.boutonActif : styles.bouton}
          onPress={() => { setLangue('auto') }}>
          <Text style={styles.buttonText}>[Auto]</Text>
        </Pressable>
      </View>

      {/* <Pressable style={styles.button} onPress={() => {
        if (motDePasse === '' || nom === '' || email === '' || adresse === '') {
          setMessageErreur('Veuillez remplir tous les champs');
        }
      }}> */}
      <Pressable
        style={styles.button}
        onPress={async () => {

          if (
            motDePasse === '' ||
            nom === '' ||
            adresse === ''
          ) {

            setMessageErreur(
              'Veuillez remplir tous les champs'
            );

            return;
          }

          try {

            await ajouterCompte(
              nom,
              motDePasse,
              0, // non-admin
              adresse,
              langue
            );

            setMessageSucces(
              'Compte créé avec succès'
            );

            setMessageErreur('');

          } catch (e) {

            setMessageErreur(
              'Ce compte existe déjà'
            );
          }
        }}
      >
        <Text style={styles.buttonText}>Enregistrer</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {

          // router.push('/entrepots');
        }}
      >
        <Text style={styles.buttonText}>
          Vers entrepots...
        </Text>
      </Pressable>

      {messageErreur !== '' && <Text style={styles.messageErreur}>{messageErreur}</Text>}
      {messageSucces !== '' && <Text style={styles.messageSucces}>{messageSucces}</Text>}
    </View>

  );

}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bouton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  boutonActif: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  messageErreur: {
    color: 'red',
    marginTop: 10,
  },
  messageSucces: {
    color: 'green',
    marginTop: 10,
  },
});