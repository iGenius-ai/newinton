import { useState } from "react";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { requestPasswordReset } from "../../lib/newinton";

const Reset = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Email Required',
        text2: 'Please enter your email address.',
      });
      return;
    }

    setIsLoading(true);
    Toast.show({
      type: 'info',
      text1: 'Processing',
      text2: 'Sending OTP to your mail...',
    });

    try {
      const response = await requestPasswordReset(email);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'An OTP has been sent. Kindly check your mail.',
      });
      navigation.navigate("verify/otp", { from: "reset", email });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Failed to send password reset request.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 h-full">
      <View className="-mt-10 p-5 flex-1">
        <View className="gap-y-8">
          <View>
            <Text className="font-circularBold mb-2 text-3xl">Reset password</Text>
            <Text className="text-xl font-circular text-gray-400 mt-2">
              Please provide your Newinton Accountancy registered email address
            </Text>
          </View>
          <View>
            <Text className="mb-1 font-circularMedium text-base text-gray-600">Email address</Text>
            <View className="border border-[#D0D5DD] rounded-md overflow-hidden">
              <TextInput
                className="rounded-md p-2 px-3 text-base font-circularMedium"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>
          </View>
          <TouchableOpacity 
            className={`items-center bg-[#4EB1B3] p-4 mb-4 rounded-full ${isLoading ? 'opacity-50' : ''}`} 
            onPress={submit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="font-circularMedium text-white text-lg">Reset</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Reset;