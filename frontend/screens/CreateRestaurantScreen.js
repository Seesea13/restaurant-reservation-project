// screens/CreateRestaurantScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text , navigation } from 'react-native';
import axios from 'axios';
import api from '../api/api';

export default function CreateRestaurantScreen({ navigation }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [averagePrice, setAveragePrice] = useState('');


  const handleCreate = async () => {
    if (!name || !location || !description || !averagePrice) {
      Alert.alert('Missing fields', 'Please fill in all fields including average price.');
      return;
    }
  
    const price = parseFloat(averagePrice);
    if (isNaN(price) || price <= 0) {
      Alert.alert('Invalid price', 'Average price must be a positive number.');
      return;
    }
  
    try {
      await api.post('/admin/restaurants', {
        name,
        location,
        description,
        average_price_per_person: price
      });
  
      Alert.alert('Restaurant created successfully');
      setName('');
      setLocation('');
      setDescription('');
      setAveragePrice('');
  
      
      setTimeout(() => {
        navigation.goBack();
      }, 300);
  
    } catch (error) {
      console.error('Creation failed', error);
      Alert.alert('Creation failed', error.response?.data?.error || 'Please try again later');
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Restaurant Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Haidilao" />

      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="e.g. Chaoyang District, Beijing" />

      
      <Text style={styles.label}>Average Price per Person (€):</Text>
      <TextInput
        style={styles.input}
        value={averagePrice}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^0-9.]/g, '');
          const valid = cleaned.split('.').length <= 2 ? cleaned : averagePrice;
          setAveragePrice(valid);
        }}
        keyboardType="numbers-and-punctuation"
        placeholder="e.g. 25"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="e.g. Sichuan hot pot, quiet environment"
        multiline
      />

      <Button title="Create Restaurant" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 16,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    marginTop: 5
  }
});
