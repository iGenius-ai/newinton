import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 h-full bg-white">
      <View style={styles.content}>
        <View className="flex-1 gap-y-4 mt-10">
          <View>
            <Text className="font-circularBold mb-2 text-3xl">Login</Text>
            <Text className="mb-5 font-circular text-lg text-gray-500">
              Don't have an account? <Link href={"/(auth)/sign-up"} className="text-[#4EB1B3]">Create now</Link>
            </Text>
          </View>

          <View>
            <View className="mb-5">
              <Text className="mb-1 font-circularMedium text-base text-gray-600">Email address</Text>
              <TextInput
                className="border border-[#D0D5DD] rounded-md p-2 px-3 text-base font-circularMedium"
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-5">
              <Text className="mb-1 font-circularMedium text-base text-gray-600">Password</Text>
              <TextInput
                className="border border-[#D0D5DD] rounded-md p-2 px-3 text-base font-circularMedium"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <View>
            <TouchableOpacity className="items-center bg-[#4EB1B3] p-4 mb-4 rounded-full">
              <Text className="font-circularMedium text-white text-lg">Log in</Text>
            </TouchableOpacity>

            <Link href={"/reset"} className='text-center'>
              <Text className="text-center font-circularMedium text-[#4eb1b3] text-lg">Forgot Password?</Text>
            </Link>
          </View>

          <Text className="text-center text-lg text-gray-500 font-circularMedium">
            By proceeding, you agree to our <Text className="text-gray-950 underline">Terms</Text> and acknowledge our <Text className="text-gray-950 underline">Privacy Policy</Text>.
          </Text>
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

export default SignIn;