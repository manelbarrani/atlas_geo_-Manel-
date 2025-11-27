import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Country } from '../types';
import { getLocalFlagLarge } from '../utils/flagsLocal';

type Props = NativeStackScreenProps<any, any>;

export default function CountryDetailPage({ route, navigation }: Props) {
  const country: Country = route?.params?.country;
  if (!country) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Aucune donnée de pays.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 12 }}>
          <Text style={{ color: '#1776ff' }}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If we have a big image for the country (Tunisie), show it; otherwise use globe
  const localFlag = getLocalFlagLarge(country.nom);
  const imageSource = localFlag || require('../../assets/globe.png');

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={{ fontSize: 18 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{country.nom}</Text>
      </View>

      <Image source={imageSource} style={styles.flag} resizeMode="cover" />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Capitale</Text>
        <Text style={styles.cardValue}>{country.capitale}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Population</Text>
        <Text style={styles.cardValue}>{country.population}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Superficie</Text>
        <Text style={styles.cardValue}>{country.superficie}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Langue officielle</Text>
        <Text style={styles.cardValue}>{country.langues}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  backButton: { 
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginLeft: 12,
    color: '#1a1a1a',
    flex: 1
  },
  flag: { 
    width: '100%', 
    height: 240, 
    borderRadius: 20, 
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#fff'
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 18, 
    marginTop: 14,
    marginHorizontal: 16,
    shadowColor: '#1e88e5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e3f2fd'
  },
  cardTitle: { 
    fontSize: 11, 
    color: '#097549ff',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '700',
    marginBottom: 8
  },
  cardValue: { 
    fontSize: 19, 
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 0.3
  }
});
