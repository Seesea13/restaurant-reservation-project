import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import api from '../api/api';

const EditRestaurantScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;

  const [name, setName] = useState(restaurant.name);
  const [location, setLocation] = useState(restaurant.location);
  const [description, setDescription] = useState(restaurant.description);
  const [averagePrice, setAveragePrice] = useState(String(restaurant.average_price_per_person));


  const handleUpdate = async () => {
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
      await api.put(`/admin/restaurants/${restaurant.id}`, {
        name,
        location,
        description,
        average_price_per_person: price
      });
  
      Alert.alert('Restaurant information updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Update failed', error);
      Alert.alert('Update failed', error.response?.data?.message || 'Server error');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Restaurant Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />

      <Text style={styles.label}>Average Price per Person (€)</Text>
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
        multiline
      />

      <Button title="Save Changes" onPress={handleUpdate} />
    </View>
  );
};

export default EditRestaurantScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
});
