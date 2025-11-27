import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import data from '../data/pays_info.json';
import { Country } from '../types';
import { getLocalFlagSmall } from '../utils/flagsLocal';

export default function CountriesPage() {
  const navigation: any = useNavigation();

  const renderItem = ({ item }: { item: Country }) => {
    const flag = getLocalFlagSmall(item.nom);
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CountryDetail', { country: item })}>
        {flag ? (
          <Image source={flag} style={styles.flagSmall} resizeMode="contain" />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.nom.charAt(0)}</Text>
          </View>
        )}
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.nom}</Text>
          <Text style={styles.itemSubtitle}>{item.capitale}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.menuButton}>
          <Text style={{ fontSize: 20 }}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.appbarTitle}>Liste des Pays</Text>
      </View>

      <FlatList 
        data={data} 
        keyExtractor={(item) => item.nom} 
        renderItem={renderItem} 
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  appbar: { 
    height: 70, 
    backgroundColor: '#fff', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  menuButton: { 
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f4f8'
  },
  appbarTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginLeft: 12,
    color: '#1a1a1a',
    letterSpacing: 0.5
  },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 18, 
    borderRadius: 20, 
    marginBottom: 14,
    marginHorizontal: 16,
    shadowColor: '#1e88e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e3f2fd'
  },
  avatar: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: '#e3f2fd', 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#bbdefb'
  },
  flagSmall: { 
    width: 56, 
    height: 40, 
    borderRadius: 8, 
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  avatarText: { 
    fontWeight: '700', 
    color: '#1976d2',
    fontSize: 24
  },
  itemContent: { 
    marginLeft: 16,
    flex: 1
  },
  itemTitle: { 
    fontSize: 18, 
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4
  },
  itemSubtitle: { 
    fontSize: 14, 
    color: '#757575'
  }
});
