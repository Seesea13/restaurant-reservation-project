import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert , TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../api/api';

const MyReservationsScreen = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get('/reservations/my');
        setReservations(response.data);
      } catch (error) {
        console.error('Failed to fetch reservations', error.response?.data || error.message);
        Alert.alert('Failed to load', 'Please try again later');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.restaurant}>{item.restaurant?.name || 'Unknown restaurant'}</Text>
    <Text>📅 Date: {item.date}</Text>
    <Text>🕒 Time: {item.time}</Text>
    <Text>👥 People: {item.people_count}</Text>

    <TouchableOpacity
      style={styles.editButton}
      onPress={() => navigation.navigate('EditReservation', { reservation: item })}
    >
      <Text style={styles.editButtonText}>✏️ Edit</Text>
    </TouchableOpacity>
  </View>
);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#666" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={reservations}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={<Text style={styles.empty}>No reservations found</Text>}
    />
  );
};

export default MyReservationsScreen;

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
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#666' },
  editButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#007BFF',
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

});
