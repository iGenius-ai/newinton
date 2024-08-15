import { View, Text, ScrollView, Dimensions, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import OTPTextView from 'react-native-otp-textinput';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';

const OTP = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const { from } = useLocalSearchParams();

  console.log(from);

  const submit = () => {
    // Assuming OTP verification is successful
    if (from === 'sign-up') {
      // Navigate to the home screen
      router.replace("/dashboard")
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
              Please enter the 4-digit code we sent to <Text className="text-gray-900">+44 4012345678</Text> via SMS
            </Text>
          </View>

          {/* The OTP Field */}
          <View>
            <OTPTextView 
              inputCount={4} placeholder="0"
              textInputStyle={styles.roundedTextInput}
            />
          </View>

          <View className="items-center">
            <Text className="font-circularMedium text-lg text-gray-400 mb-1">Haven&apos;t received the code yet?</Text>
            <TouchableOpacity><Text className="font-circularMedium text-[#4EB1B3] text-lg underline">Tap here to resend the code in 54s</Text></TouchableOpacity>
          </View>

          <TouchableOpacity className="items-center bg-[#4EB1B3] p-4 mb-4 rounded-full" onPress={submit} asChild>
            <Text className="font-circularMedium text-white text-lg">Verify my account</Text>
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
    width: 75,
    height: 75,
    fontFamily: "CircularStd-Bold",
    fontSize: 60,
    padding: 10
  },
});