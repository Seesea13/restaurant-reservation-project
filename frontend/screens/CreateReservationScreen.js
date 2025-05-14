import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../api/api';

const CreateReservationScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [peopleCount, setPeopleCount] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants');
        setRestaurants(response.data);
        if (response.data.length > 0) {
          setRestaurantId(response.data[0].id.toString()); // The first restaurant is selected by default
        }
      } catch (error) {
        console.error('Failed to load restaurant', error);
        Alert.alert('Error', 'Unable to load restaurant list');
      }
    };

    fetchRestaurants();
  }, []);

  const handleCreateReservation = async () => {
    if (!restaurantId || !date || !time || !peopleCount) {
      Alert.alert('Please fill in all information');
      return;
    }

    try {
      await api.post('/reservations', {
        restaurantId: Number(restaurantId),
        date: date.toISOString().split('T')[0], // Format: YYYY-MM-DD
        time: `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`, // Format: HH:MM
        people_count: Number(peopleCount),
      });

      Alert.alert('Appointment successful', 'Returning to restaurant list', [
        {
          text: 'OK',
          onPress: () => {
            // clear to list
            resetForm();
            navigation.navigate('Restaurants');
          }
        }
      ]);
    } catch (error) {
      console.error('Appointment failed', error.response?.data || error.message);
      Alert.alert('Appointment failed', error.response?.data?.message || 'Try Later');
    }
  };

  const resetForm = () => {
    setDate(new Date());
    setTime(new Date());
    setPeopleCount('');
    if (restaurants.length > 0) {
      setRestaurantId(restaurants[0].id.toString());
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a new appointment</Text>

      <Text style={styles.label}>Select Restaurant:</Text>
      <Picker
        selectedValue={restaurantId}
        onValueChange={(itemValue) => setRestaurantId(itemValue)}
        style={styles.input}
      >
        {restaurants.map((restaurant) => (
          <Picker.Item
            key={restaurant.id}
            label={restaurant.name}
            value={restaurant.id.toString()}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Select date:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{date.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Select time:</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
        <Text>
          {time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}

      <Text style={styles.label}>Number of people:</Text>
      <TextInput
        placeholder="For example:4"
        value={peopleCount}
        onChangeText={setPeopleCount}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Submit Reservation" onPress={handleCreateReservation} />
    </ScrollView>
  );
};

export default CreateReservationScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  label: { marginTop: 15, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginTop: 5,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
});
