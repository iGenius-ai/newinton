import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Confirm = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [showRetypePassword, setShowRetypePassword] = useState(false)
  const [retypePassword, setRetypePassword] = useState('');

  return (
    <SafeAreaView className="flex-1 h-full bg-white">
      <View className="flex-1 gap-y-4 p-5">
        <View>
          <Text className="font-circularBold mb-2 text-3xl text-[#101828]">Create a new password</Text>
          <Text className="mb-5 font-circular text-lg text-[#667085]">
            Enter a new password known to you alone.
          </Text>
        </View>

        <View>
        <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-gray-600">Create a password</Text>
            <View className="border border-[#D0D5DD] flex-row rounded-md p-2 px-3">
              <TextInput
                className="flex-1 text-base font-circularMedium"
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <Ionicons name="eye-outline" size={24} color="#888" />
                ) : (
                  <Ionicons name="eye-off-outline" size={24} color="#888" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-gray-600">Re-type password</Text>
            <View className="border border-[#D0D5DD] flex-row rounded-md p-2 px-3">
              <TextInput
                className="flex-1 text-base font-circularMedium"
                placeholder="Re-type password"
                value={retypePassword}
                onChangeText={setRetypePassword}
                secureTextEntry={!showRetypePassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowRetypePassword(!showRetypePassword)}>
                {!showRetypePassword ? (
                  <Ionicons name="eye-outline" size={24} color="#888" />
                ) : (
                  <Ionicons name="eye-off-outline" size={24} color="#888" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity className="items-center bg-[#4EB1B3] p-4 mb-4 rounded-full">
            <Text className="font-circularMedium text-white text-lg">Update new password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  createLink: {
    color: '#4EB1B3',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#4EB1B3',
    textAlign: 'center',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  termsLink: {
    color: '#4EB1B3',
  },
});

export default Confirm;