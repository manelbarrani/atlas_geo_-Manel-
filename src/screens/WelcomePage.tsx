import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, any>;
const { width } = Dimensions.get('window');

export default function WelcomePage({ navigation }: Props) {
  const handleQuit = () => {
    Alert.alert(
      'Quitter',
      'Voulez-vous fermer l\'application ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Quitter', onPress: () => {
          // Sur la page Welcome, on reste ici (c'est déjà la première page)
          // Si vous voulez vraiment fermer l'app, utilisez: BackHandler.exitApp() sur Android
        }, style: 'destructive' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* AppBar avec gradient */}
      <View style={styles.appbar}>
        <Text style={styles.title}>Atlas Géographique</Text>
        <TouchableOpacity style={styles.quitButton} onPress={handleQuit}>
          <Text style={styles.quitButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Contenu central */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/globe.png')} style={styles.image} resizeMode="contain" />
        </View>

        <Text style={styles.welcomeTitle}>Bienvenue</Text>
        <Text style={styles.welcomeText}>Découvrez les pays du monde</Text>
        <Text style={styles.welcomeSubtext}>Explorez les capitales, populations et cultures</Text>

        {/* Bouton Explorer avec effet */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.replace('MainDrawer')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Explorer →</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Examen - Développement Mobile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0d1b2a',
  },
  appbar: { 
    width: '100%', 
    paddingTop: 50, 
    paddingBottom: 20, 
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(30,136,229,0.08)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(30,136,229,0.2)'
  },
  title: { 
    color: '#e0f2fe', 
    fontSize: 24, 
    fontWeight: '800',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  quitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(239,68,68,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(239,68,68,0.4)',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  quitButtonText: {
    color: '#fca5a5',
    fontSize: 22,
    fontWeight: '700'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(30,136,229,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    shadowColor: '#1e88e5',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 20,
    borderWidth: 3,
    borderColor: 'rgba(30,136,229,0.3)'
  },
  image: { 
    width: 260, 
    height: 260
  },
  welcomeTitle: {
    color: '#e0f2fe',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  welcomeText: { 
    color: '#bae6fd', 
    fontSize: 22, 
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
    letterSpacing: 0.5
  },
  welcomeSubtext: {
    color: 'rgba(186,230,253,0.7)',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 48,
    fontWeight: '400',
    lineHeight: 22
  },
  button: { 
    backgroundColor: '#1e88e5',
    paddingVertical: 18, 
    paddingHorizontal: 70, 
    borderRadius: 35,
    shadowColor: '#1e88e5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '800',
    fontSize: 20,
    letterSpacing: 1.5,
    textTransform: 'uppercase'
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center'
  },
  footerText: {
    color: 'rgba(186,230,253,0.5)',
    fontSize: 13,
    fontWeight: '500'
  }
});
