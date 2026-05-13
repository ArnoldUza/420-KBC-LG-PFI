import { View, Text } from 'react-native';

export default function Entrepots() {

  return (
    <View>
      <Text>Page entrepôts</Text>
    </View>
  );
}

// undo comment: ctrl + K then ctrl + U

// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet
// } from 'react-native';

// import MapView, {Marker, Circle, Polyline} from 'react-native-maps';

// import { useEffect, useState } from 'react';

// import entrepots from '../entrepots/entrepots';

// import routeCoords from '../entrepots/route';

// export default function Entrepots() {

//   const [position, setPosition] = useState(null);

//   const [plusProche, setPlusProche] = useState(null);

//   useEffect(() => {

//     async function obtenirPosition() {

//       const { status } =
//         await Location.requestForegroundPermissionsAsync();

//       if (status !== 'granted') {
//         return;
//       }

//       const location =
//         await Location.getCurrentPositionAsync({});

//       const userPosition = {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude
//       };

//       setPosition(userPosition);

//       trouverEntrepotPlusProche(userPosition);
//     }

//     obtenirPosition();

//   }, []);

//   function distance(lat1, lon1, lat2, lon2) {

//     return Math.sqrt(
//       Math.pow(lat2 - lat1, 2) +
//       Math.pow(lon2 - lon1, 2)
//     );
//   }

//   function trouverEntrepotPlusProche(userPos) {

//     let meilleur = entrepots[0];

//     let meilleureDistance = distance(
//       userPos.latitude,
//       userPos.longitude,
//       meilleur.latitude,
//       meilleur.longitude
//     );

//     for (const entrepot of entrepots) {

//       const d = distance(
//         userPos.latitude,
//         userPos.longitude,
//         entrepot.latitude,
//         entrepot.longitude
//       );

//       if (d < meilleureDistance) {

//         meilleureDistance = d;

//         meilleur = entrepot;
//       }
//     }

//     setPlusProche(meilleur);
//   }

//   if (!position) {

//     return (
//       <View style={styles.center}>
//         <Text>Chargement...</Text>
//       </View>
//     );
//   }

//   return (

//     <View style={{ flex: 1 }}>

//       <View style={styles.liste}>

//         {entrepots.map((e) => (

//           <Pressable
//             key={e.id}
//             style={[
//               styles.bouton,

//               plusProche?.id === e.id
//                 ? styles.actif
//                 : null
//             ]}
//           >

//             <Text style={{ color: 'white' }}>
//               {e.nom}
//             </Text>

//           </Pressable>
//         ))}

//       </View>

//       <MapView
//         style={{ flex: 1 }}
//         initialRegion={{
//           latitude: position.latitude,
//           longitude: position.longitude,
//           latitudeDelta: 0.2,
//           longitudeDelta: 0.2
//         }}
//       >

//         {/* maison utilisateur */}

//         <Marker
//           coordinate={position}
//           title="Votre position"
//           pinColor="blue"
//         />

//         {/* entrepots */}

//         {entrepots.map((e) => (

//           <View key={e.id}>

//             <Marker
//               coordinate={{
//                 latitude: e.latitude,
//                 longitude: e.longitude
//               }}
//               title={e.nom}
//             />

//             <Circle
//               center={{
//                 latitude: e.latitude,
//                 longitude: e.longitude
//               }}
//               radius={5000}
//             />

//           </View>
//         ))}

//         {/* chemin */}

//         <Polyline
//           coordinates={routeCoords}
//           strokeWidth={4}
//         />

//       </MapView>

//     </View>
//   );
// }

// const styles = StyleSheet.create({

//   liste: {
//     height: '25%',
//     justifyContent: 'space-around',
//     padding: 10
//   },
//   bouton: {
//     backgroundColor: 'gray',
//     padding: 10,
//     borderRadius: 10
//   },
//   actif: {
//     backgroundColor: 'purple'
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });