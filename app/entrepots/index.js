
// undo comment: ctrl + K then ctrl + U

import {
  View,
  Text,
  StyleSheet,
  Pressable
} from 'react-native';

import {
  useState
} from 'react';

import MapView, {
  Marker,
  Polyline,
  Circle
} from 'react-native-maps';

import {
  Ionicons
} from '@expo/vector-icons';

import entrepots from './entrepots';

import routeCoords from './route.json';

export default function Entrepots() {

  const maison = {

    latitude: 45.558,
    longitude: -73.730
  };

  const initialRegion = {

    latitude: 45.558,
    longitude: -73.730,

    latitudeDelta: 0.2,
    longitudeDelta: 0.2
  };

  const [selection, setSelection] =
    useState(null);

  return (

    <View style={{ flex: 1 }}>

      {/* LISTE 25% */}

      <View style={styles.liste}>

        {entrepots.map((e) => (

          <Pressable
            key={e.id}
            style={[

              styles.bouton,

              selection === e.id
                ? styles.actif
                : null
            ]}
            onPress={() =>
              setSelection(e.id)
            }
          >

            <Text style={styles.texte}>
              {e.nom}
            </Text>

          </Pressable>
        ))}

      </View>

      {/* MAP 75% */}

      <MapView
        style={{ flex: 1 }}
        provider="google"
        initialRegion={initialRegion}
      >

        {/* MAISON */}

        <Marker
          coordinate={maison}
          title="Maison"
        >

          <Ionicons
            name="home"
            size={40}
            color="blue"
          />

        </Marker>

        {/* ENTREPOTS */}

        {entrepots.map((e) => (

          <View key={e.id}>

            <Marker
              coordinate={{
                latitude: e.latitude,
                longitude: e.longitude
              }}
              title={e.nom}
              onPress={() =>
                setSelection(e.id)
              }
            >

              <Ionicons
                name="business"
                size={40}
                color={
                  selection === e.id
                    ? 'purple'
                    : 'red'
                }
              />

            </Marker>

            {/* CERCLE 5KM */}

            <Circle
              center={{
                latitude: e.latitude,
                longitude: e.longitude
              }}
              radius={5000}
              strokeWidth={2}
            />

          </View>
        ))}

        {/* CHEMIN MANUEL */}

        <Polyline
          coordinates={routeCoords}
          strokeColor="purple"
          strokeWidth={5}
        />

      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({

  liste: {
    height: '25%',
    justifyContent: 'space-around',
    padding: 10
  },

  bouton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10
  },

  actif: {
    backgroundColor: 'purple'
  },

  texte: {
    color: 'white',
    fontWeight: 'bold'
  }
});










































// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable
// } from 'react-native';

// import MapView, {
//   Marker,
//   Circle,
//   Polyline
// } from 'react-native-maps';

// import { Ionicons } from '@expo/vector-icons';

// import { useState } from 'react';

// import entrepots from './entrepots';

// import routeCoords from './route.json';

// export default function Entrepots() {

//   // maison choisie manuellement

//   const maison = {
//     latitude: 45.558,
//     longitude: -73.730
//   };

//   // entrepôt sélectionné

//   const [selection, setSelection] =
//     useState(null);

//   return (

//     <View style={{ flex: 1 }}>

//       {/* LISTE 25% */}

//       <View style={styles.liste}>

//         {entrepots.map((e) => (

//           <Pressable
//             key={e.id}
//             style={[

//               styles.bouton,

//               selection === e.id
//                 ? styles.actif
//                 : null
//             ]}
//             onPress={() => setSelection(e.id)}
//           >

//             <Text style={styles.texteBouton}>
//               {e.nom}
//             </Text>

//           </Pressable>
//         ))}

//       </View>

//       {/* CARTE 75% */}

//       <MapView
//         style={{ flex: 1 }}
//         initialRegion={{
//           latitude: 45.558,
//           longitude: -73.730,
//           latitudeDelta: 0.25,
//           longitudeDelta: 0.25
//         }}
//       >

//         {/* MAISON */}

//         <Marker
//           coordinate={maison}
//           title="Maison"
//         >

//           <Ionicons
//             name="home"
//             size={40}
//             color="blue"
//           />

//         </Marker>

//         {/* ENTREPOTS */}

//         {entrepots.map((e) => (

//           <View key={e.id}>

//             <Marker
//               coordinate={{
//                 latitude: e.latitude,
//                 longitude: e.longitude
//               }}
//               title={e.nom}
//               onPress={() =>
//                 setSelection(e.id)
//               }
//             >

//               <Ionicons
//                 name="business"
//                 size={40}
//                 color={
//                   selection === e.id
//                     ? 'purple'
//                     : 'red'
//                 }
//               />

//             </Marker>

//             {/* CERCLE 5 KM */}

//             <Circle
//               center={{
//                 latitude: e.latitude,
//                 longitude: e.longitude
//               }}
//               radius={5000}
//               strokeWidth={2}
//             />

//           </View>
//         ))}

//         {/* CHEMIN MANUEL */}

//         <Polyline
//           coordinates={routeCoords}
//           strokeWidth={5}
//           strokeColor="purple"
//         />

//       </MapView>

//     </View>
//   );
// }

// const styles = StyleSheet.create({

//   liste: {
//     height: '25%',
//     padding: 10,
//     justifyContent: 'space-around'
//   },

//   bouton: {
//     backgroundColor: 'gray',
//     padding: 10,
//     borderRadius: 10
//   },

//   actif: {
//     backgroundColor: 'purple'
//   },

//   texteBouton: {
//     color: 'white',
//     fontWeight: 'bold'
//   }
// });