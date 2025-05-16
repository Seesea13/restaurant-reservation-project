// screens/EditReservationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '../api/api';

const EditReservationScreen = ({ route, navigation }) => {
  const { reservation } = route.params;

  const [date, setDate] = useState(reservation.date);
  const [time, setTime] = useState(reservation.time);
  const [peopleCount, setPeopleCount] = useState(String(reservation.people_count));

  const handleUpdate = async () => {
    if (!date || !time || !peopleCount) {
      Alert.alert('Missing fields', 'Please fill in all fields');
      return;
    }

    const people = parseInt(peopleCount);
    if (isNaN(people) || people <= 0) {
      Alert.alert('Invalid number', 'People must be a positive number');
      return;
    }

    try {
      await api.put(`/reservations/${reservation.id}`, {
        date,
        time,
        people_count: people,
      });

      Alert.alert('Reservation updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Update failed', error);
      Alert.alert('Update failed', error.response?.data?.message || 'Server error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="e.g. 2025-06-01"
      />

      <Text style={styles.label}>Time (HH:MM)</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="e.g. 18:30"
      />

      <Text style={styles.label}>Number of People</Text>
      <TextInput
        style={styles.input}
        value={peopleCount}
        onChangeText={setPeopleCount}
        keyboardType="numeric"
        placeholder="e.g. 4"
      />

      <Button title="Save Changes" onPress={handleUpdate} />
    </View>
  );
};

export default EditReservationScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  label: { fontSize: 16, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 6,
    marginTop: 4,
  },
});
