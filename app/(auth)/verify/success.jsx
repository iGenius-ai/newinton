import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { SmsNotification } from 'iconsax-react-native';

const Success = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center p-5 gap-y-10">
        <View className="p-7 rounded-full self-center bg-[#E4E7EC]">
          <SmsNotification size="70" color="#37a19a" variant="Bulk"/>
        </View>

        <View className="items-center justify-center">
          <Text className="font-circularMedium text-[#101828] text-2xl">Credentials submitted</Text>
          <Text className="text-center font-circular text-base mt-2 text-[#667085]">
            Kindly check your mail frequently while your account {"\n"}manager reaches out to you within the next 24 hours
            {"\n"}for an onboarding meeting
          </Text>
        </View>

        <TouchableOpacity className="items-center bg-[#4EB1B3] p-4 mb-4 rounded-full">
          <Text className="font-circularMedium text-white text-base">Open mail</Text>
        </TouchableOpacity>
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

export default Success;