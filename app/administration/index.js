// page d'ajout et de suppression de produits
//import {useSQLiteContext, SQLiteProvider} from "expo-sqlite";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image
} from 'react-native';

import { useEffect, useState } from 'react';

import {
  initDB,
  ajouterProduit,
  getProduits,
  supprimerProduit
} from '../bdSQLite';

export default function Admin() {

  const [listeProduits, setListeProduits] = useState([]);

  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState('');

  async function chargerProduits() {

    const produits = await getProduits();

    setListeProduits(produits);
  }

  useEffect(() => {

    async function setup() {

      await initDB();

      await chargerProduits();
    }

    setup();

  }, []);

  async function handleAjouter() {

    await ajouterProduit(
      nom,
      description,
      parseFloat(prix),
      image
    );

    await chargerProduits();

    setNom('');
    setDescription('');
    setPrix('');
    setImage('');
  }

  async function handleSupprimer(id) {

    await supprimerProduit(id);

    await chargerProduits();
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>

      <Text>Ajouter un produit en tant qu'Admin</Text>

      <TextInput
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        placeholder="Prix"
        value={prix}
        onChangeText={setPrix}
      />

      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />

      <Button
        title="Ajouter"
        onPress={handleAjouter}
      />

      <Text>Liste de Produits disponibles: </Text>

      <FlatList
        data={listeProduits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <View style={{ marginTop: 20 }}>

            <Image
              source={{ uri: item.image }}
              style={{
                width: 100,
                height: 100
              }}
            />

            <Text>{item.nom}</Text>

            <Text>{item.prix} $</Text>

            <Button
              title="Supprimer"
              onPress={() =>
                handleSupprimer(item.id)
              }
            />

          </View>
        )}
      />

    </View>
  );
}