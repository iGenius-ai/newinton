import { View, Text, ScrollView, Dimensions, StyleSheet, Platform, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import OTPTextView from 'react-native-otp-textinput';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const BASE_URL = "https://newinton-backend-service.onrender.com";

const OTP = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { from } = useLocalSearchParams();
  const route = useRoute();
  const { email } = route.params;

  const submit = async () => {
    // Assuming OTP verification is successful
    if (from === 'sign-up') {
      setIsLoading(true);
      Toast.show({
        type: 'info',
        text1: 'Submitting...',
        text2: 'Please wait while we process your request.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });

      const requestPayload = {
        email: email,
        otp: code, // Add the OTP from input
      };

      try {
        const response = await fetch(`${BASE_URL}/api/v1/accounts/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload),
        });

        const data = await response.json();

        if (!response.ok) {
          setIsLoading(false);
          // Throw an error if the response is not ok
          throw new Error(data.message || 'Failed to verify OTP');
        }

        // Show success toast
        Toast.show({
          type: 'success',
          text1: 'Verification Successful',
          text2: 'Your email has been verified successfully.',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
        });

        setIsLoading(false);
        setTimeout(() => {
          router.replace("/(auth)/sign-in")
        })
      } catch (error) {
        setIsLoading(false);

        // Display error toast
        Toast.show({
          type: 'error',
          text1: 'Verification Failed',
          text2: error.message,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
        });
      } finally {
        setIsLoading(false);
      }
      // Navigate to the home screen
    } else if (from === 'reset') {
      // Navigate to the create new password screen
      navigation.navigate('reset_password');
    }
  };
  
  return (
    <SafeAreaView className="bg-white flex-1 h-full">
      <View className="-mt-10 p-5 flex-1">
        <View className="gap-y-8">
          <View>
            <Text className="font-circularBold mb-2 text-3xl">Verify your account</Text>
            <Text className="text-xl font-circular text-gray-400 mt-2">
              Please enter the 4-digit code we sent to <Text className="text-gray-900">{email}</Text>
            </Text>
          </View>

          {/* The OTP Field */}
          <View>
            <OTPTextView 
              inputCount={6} placeholder="0"
              textInputStyle={styles.roundedTextInput}
              handleTextChange={setCode}
            />
          </View>

          <View className="items-center">
            <Text className="font-circularMedium text-lg text-gray-400 mb-1">Haven&apos;t received the code yet?</Text>
            <TouchableOpacity><Text className="font-circularMedium text-[#4EB1B3] text-lg underline">Tap here to resend the code in 54s</Text></TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={submit} 
            className={`text-center p-4 mb-4 rounded-full ${isLoading ? 'bg-gray-400' : 'bg-[#4EB1B3]'}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size={20} color={"#D0D5DD"} /> 
            ) : (
              <Text className="font-circular text-white text-center text-lg">
                Verify my account
              </Text>
            )}
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  )
}

export default OTP

const styles = StyleSheet.create({
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#D0D5DD",
    width: 50,
    height: 50,
    fontFamily: "CircularStd-Bold",
    fontSize: 35,
    padding: 8
  },
});