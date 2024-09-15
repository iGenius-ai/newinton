import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { Link } from 'expo-router';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Firebase config
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission()
    const enabled = 
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization Status: ", authStatus)
    }
  }

  useEffect(() => {
    if (requestUserPermission()) {
      messaging().getToken().then((token) => {
        console.log("FCM Token", token)
      })
    } else {
      console.log("Permission Denied", authStatus)
    }

    messaging().getInitialNotification().then(async (remoteMessage) => {
      if (remoteMessage) {
        console.log("Notification caused app to open from quit state", remoteMessage.notification);
      }
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("Notification caused app to open from background state:", remoteMessage.notification);
    });
    
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM Message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const submit = async () => {
    setIsLoading(true);
    Toast.show({
      type: 'info',
      text1: 'Authenticating...',
      text2: 'Please wait while we process your request.',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 40,
    });

    const requestPayload = {
      email: email,
      password: password,
      fcm_token
    };

    try {
      const response = await fetch(`${BASE_URL}/api/v1/accounts/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        // If the response is not ok, we throw an error with the message from the server
        throw new Error(data.message || 'An error occurred during signup');
      }
      
      Toast.show({
        type: 'success',
        text1: 'Authentication Successful',
        text2: 'Your account has been created successfully.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setIsLoading(false);
    } catch (error) {
      // Check if the error is from our API (has a message property)
      if (error.message && typeof error.message === 'string') {
        console.log(error)
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Authentication Failed',
          text2: error.message,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
        });
      } else {
        // If it's not from our API, show a generic error message
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'An unexpected error occured',
          text2: error.message,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

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
            <TouchableOpacity 
              onPress={submit} 
              className={`text-center p-4 mb-4 rounded-full ${isLoading ? 'bg-gray-400' : 'bg-[#4EB1B3]'}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size={20} color={"#D0D5DD"} /> 
              ) : (
                <Text className="font-circular text-white text-center text-lg">
                Create new account
                </Text>
              )}
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