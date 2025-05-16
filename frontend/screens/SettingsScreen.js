import React, { useState } from 'react';
import {
  View, Text, TextInput, Alert, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import Modal from 'react-native-modal';

const SettingsScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['token', 'user', 'userRole']);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    try {
      await api.post('/auth/change-password', { oldPassword, newPassword });
      Alert.alert('Success', 'Password changed successfully. Please log in again.');
      setModalVisible(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      handleLogout();
    } catch (error) {
      Alert.alert('Failed to change', error.response?.data?.message || 'Server error');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.optionButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.optionButtonText}>🔑 Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>🚪 Log Out</Text>
      </TouchableOpacity>

      {/*New Modal with better keyboard handling */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        avoidKeyboard
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalWrapper}
        >
          <ScrollView contentContainerStyle={styles.modalContent} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Change Password</Text>

            <Text style={styles.label}>Old Password</Text>
            <TextInput
              placeholder="Enter old password"
              secureTextEntry
              style={styles.input}
              value={oldPassword}
              onChangeText={setOldPassword}
            />

            <Text style={styles.label}>New Password</Text>
            <TextInput
              placeholder="Enter new password"
              secureTextEntry
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
              placeholder="Re-enter new password"
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#6c757d' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#28a745' }]}
                onPress={handlePasswordChange}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  optionButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
