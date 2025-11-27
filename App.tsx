import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomePage from './src/screens/WelcomePage';
import CountriesPage from './src/screens/CountriesPage';
import CountryDetailPage from './src/screens/CountryDetailPage';
import AboutPage from './src/screens/AboutPage';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Countries" component={CountriesPage} />
      <Stack.Screen name="CountryDetail" component={CountryDetailPage} />
    <Stack.Screen name="Welcome" component={WelcomePage} />

    </Stack.Navigator>
  );
}

function CustomDrawerContent({ navigation }: any) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.drawerHeader}>
        <Image source={require('./assets/globe.png')} style={styles.drawerHeaderImage} resizeMode="contain" />
        <Text style={styles.drawerHeaderTitle}>Atlas Géographique</Text>
      </View>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('HomeStack')}>
        <Text style={styles.drawerItemText}>Accueil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('About')}>
        <Text style={styles.drawerItemText}>À propos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          Alert.alert('Quitter', "Voulez-vous retourner à l'écran d'accueil?", [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Oui', onPress: () => {
              // Obtenir la navigation racine en remontant deux niveaux (Drawer -> Stack)
              navigation.getParent()?.getParent()?.reset({ 
                index: 0, 
                routes: [{ name: 'Welcome' }] 
              });
            }}
          ]);
        }}
      >
        <Text style={styles.drawerItemText}>Quitter</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="MainDrawer" options={{ headerShown: false }}>
          {() => (
            <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
              <Drawer.Screen name="HomeStack" component={HomeStack} options={{ title: 'Liste des Pays' }} />
              <Drawer.Screen name="About" component={AboutPage} options={{ title: 'À propos' }} />
            </Drawer.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: { 
    paddingTop: 70, 
    paddingBottom: 32, 
    alignItems: 'center', 
    backgroundColor: '#0d1b2a',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(30,136,229,0.3)'
  },
  drawerHeaderImage: { 
    width: 100, 
    height: 100, 
    marginBottom: 16,
    borderRadius: 50,
    backgroundColor: 'rgba(30,136,229,0.15)',
    padding: 15,
    borderWidth: 3,
    borderColor: 'rgba(30,136,229,0.4)',
    shadowColor: '#1e88e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15
  },
  drawerHeaderTitle: { 
    color: '#e0f2fe', 
    fontSize: 22, 
    fontWeight: '800',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  drawerItem: { 
    paddingVertical: 18, 
    paddingHorizontal: 24, 
    borderBottomWidth: StyleSheet.hairlineWidth, 
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  drawerItemText: { 
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 0.3
  }
});
