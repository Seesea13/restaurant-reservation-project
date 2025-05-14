import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert , TextInput , clearFilters} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../api/api';

const RestaurantListScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="settings-outline"
          size={24}
          color="black"
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate('Settings')}
        />
      ),
    });

    fetchRestaurants();
    checkRole();
  }, []);

  const checkRole = async () => {
    const role = await AsyncStorage.getItem('userRole');
    setIsAdmin(role === 'admin');
  };

  const fetchRestaurants = async () => {
    try {
      let url = '/restaurants';
      const params = [];

      if (minPrice) params.push(`minPrice=${minPrice}`);
      if (maxPrice) params.push(`maxPrice=${maxPrice}`);

      if (params.length > 0) {
        url += '?' + params.join('&');
      }
      
      const response = await api.get(url);
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to fetch restaurant list', error);
    }
  };

  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    fetchRestaurants();
  };
  

  const handleDelete = async (id) => {
    Alert.alert('Confirm Deletion', 'Are you sure you want to delete this restaurant?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/admin/restaurants/${id}`);
            Alert.alert('Restaurant deleted');
            fetchRestaurants();
          } catch (error) {
            console.error('Deletion failed', error);
            Alert.alert('Failed to delete', error.response?.data?.message || 'Server error');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>Average price: €{item.average_price_per_person}</Text>

      {isAdmin && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditRestaurant', { restaurant: item })}
          >
            <Text style={styles.buttonText}>✏️ Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.toggleFilterButton}
        onPress={() => setShowFilters(!showFilters)}
      >
        <Text style={styles.searchButtonText}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Text>
      </TouchableOpacity>

      {showFilters && (
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>💰 Price Range Filter (€)</Text>

          <View style={styles.inputRow}>
            <TextInput
              placeholder="Min"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
              style={[styles.input, { flex: 1, marginRight: 8 }]}
            />
            <TextInput
              placeholder="Max"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
              style={[styles.input, { flex: 1 }]}
            />
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={fetchRestaurants}>
            <Text style={styles.searchButtonText}>🔍 Search</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Text style={styles.clearButtonText}>Clear Filters</Text>
        </TouchableOpacity>

        </View>
      )}


      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {isAdmin && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CreateRestaurant')}
        >
          <Text style={styles.buttonText}>➕ Create New Restaurant</Text>
        </TouchableOpacity>
      )}

      {!isAdmin && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CreateReservation')}
          >
            <Text style={styles.buttonText}>📅 Make a Reservation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => navigation.navigate('MyReservations')}
          >
            <Text style={styles.buttonText}>👀 View My Reservations</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default RestaurantListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingBottom: 40 },
  filterContainer: { marginBottom: 16 },
  filterLabel: { fontSize: 16, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  searchButtonText: { color: '#fff', fontWeight: 'bold' },
  card: {
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  location: { fontSize: 14, color: '#666', marginTop: 4 },
  description: { fontSize: 14, color: '#444', marginTop: 8 },
  price: { marginTop: 6, fontStyle: 'italic', color: '#888' },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  toggleFilterButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  
  inputRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  
  clearButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
});