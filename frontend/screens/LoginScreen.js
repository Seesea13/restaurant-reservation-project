import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;

    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('userRole', user.role);

    if (user.role === 'admin') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AdminReservations' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Restaurants' }],
      });
    }

  } catch (error) {
    const message = error.response?.data?.message || 'Login failed. Please try again.';
    Alert.alert('Login Error', message);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize='none'
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="No account? Tap to register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  }
});
