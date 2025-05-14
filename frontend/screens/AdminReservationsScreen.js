import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../api/api'; 


const AdminReservationsScreen = () => {
  const navigation = useNavigation();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

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
          )                    
    });
  }, [navigation]);
  

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get('/admin/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error('load reservation faild', error.response?.data || error.message);
      Alert.alert('error', 'cant load reservation list');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReservation = (reservationId) => {
    Alert.alert(
      'Confirm delete',
      'Are you sure to delete this reservation?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/admin/reservations/${reservationId}`);
              Alert.alert('Delete Success');
              fetchReservations(); 
            } catch (error) {
              console.error('Delete Faild', error.response?.data || error.message);
              Alert.alert('Delete Faild', error.response?.data?.message || 'Try Later');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.restaurant}>Restaurants：{item.restaurant?.name || 'Unknow restaurant'}</Text>
      <Text>Booker：{item.user?.email || 'Unknow User'}</Text>
      <Text>📅 Date：{item.date}</Text>
      <Text>🕒 Time：{item.time}</Text>
      <Text>👥 Number of people：{item.people_count}</Text>

      <View style={styles.deleteButton}>
        <Button
          title="Delete"
          color="red"
          onPress={() => handleDeleteReservation(item.id)}
        />
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#666" />
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topButtons}>

      <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Restaurants')}
      >
      <Text style={styles.buttonText}>📋 Restaurant Management</Text>
      </TouchableOpacity>


      </View>
  
      <FlatList
        contentContainerStyle={styles.container}
        data={reservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No reservation record</Text>}
      />
    </View>
  );
  
};

export default AdminReservationsScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  restaurant: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  deleteButton: { marginTop: 10 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#666' },

  topButtons: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  
});
