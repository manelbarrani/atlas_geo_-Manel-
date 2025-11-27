import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>À propos</Text>
      <Text style={styles.text}>Cette application présente un atlas géographique interactif avec une liste de pays et leurs informations.</Text>
      <Text style={styles.text}>Examen: Développement Mobile Cross Plateforme</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  text: { fontSize: 14, color: '#333', marginBottom: 8 }
});
