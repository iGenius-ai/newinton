import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Modal, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import PhoneInput from 'react-native-phone-number-input';
import Toast from 'react-native-toast-message';

const advert = [
  { name: 'word-of-mouth', displayName: 'Word of Mouth' },
  { name: 'instagram', displayName: 'Instagram' },
  { name: 'tiktok', displayName: 'TikTok' },
  { name: 'youtube', displayName: 'YouTube' },
  { name: 'facebook', displayName: 'Facebook' },
  { name: 'other', displayName: 'Other' },
];

const SignUp = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [retypePassword, setRetypePassword] = useState('');
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [refereeName, setRefereeName] = useState('');
  const [selectedAdvert, setSelectedAdvert] = useState(advert[0]);
  const [showAdvertModal, setShowAdvertModal] = useState(false);
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const renderAdvert = ({ item }) => (
    <TouchableOpacity
      className="py-2 border-b border-gray-200"
      onPress={() => {
        setSelectedAdvert(item);
        setShowAdvertModal(false);
      }}
    >
      <Text className="text-base font-circularMedium">{item.displayName}</Text>
    </TouchableOpacity>
  );

  const submit = async () => {
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
      password: password,
      meta_data: {
        fullName: fullName,
        phoneNumber: phoneNumber
      },
      referrer: refereeName,
      referrer_source: selectedAdvert.name
    };

    try {
      const response = await fetch(`${BASE_URL}/api/v1/accounts/create`, {
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
        text1: 'Signup Successful',
        text2: 'Your account has been created successfully.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setIsLoading(false);
      
      setTimeout(() => {
        navigation.navigate("verify/otp", { from: "sign-up", email: email });
      }, 2000);
    } catch (error) {
      // Check if the error is from our API (has a message property)
      if (error.message && typeof error.message === 'string') {
        console.log(error)
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
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
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 20 }} className="flex-1 gap-y-4 mt-10">
        <View className="mt-6">
          <Text className="font-circularBold mb-2 text-3xl">Create your account</Text>
          <Text className="mb-5 font-circular text-lg text-gray-500">
            Have an account? <Link href={"/(auth)/sign-in"} className="text-[#4EB1B3]">Login</Link>
          </Text>
        </View>

        <View>
          <InputField
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter first name"
          />
          <InputField
            label="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email address"
          />
          <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-gray-600">Phone number</Text>
            <View className="border border-[#D0D5DD] rounded-md overflow-hidden flex-row">
              <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode="NG"
                layout="first"
                onChangeFormattedText={(text) => {
                  setPhoneNumber(text);
                }}
                autoFocus
                textInputStyle={{
                  fontFamily: 'CircularStd-Book', // or 'CircularMedium' if you prefer
                  fontSize: 16,
                  color: '#333',
                  height: 40,
                }}
                countryPickerButtonStyle = {{
                  borderRightWidth: 1, borderRightColor: "#D0D5DD"
                }}
                codeTextStyle={{
                  fontFamily: 'CircularStd-Book', // or 'CircularMedium' if you prefer
                  fontSize: 16,
                  color: '#333',
                }}
                containerStyle={styles.phoneInputContainer}
                textContainerStyle={styles.phoneInputTextContainer}
              />
            </View>
          </View>
          <PasswordField
            label="Create a password"
            value={password}
            onChangeText={setPassword}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
          />
          <PasswordField
            label="Re-type password"
            value={retypePassword}
            onChangeText={setRetypePassword}
            showPassword={showRetypePassword}
            toggleShowPassword={() => setShowRetypePassword(!showRetypePassword)}
          />
          <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-gray-600">How did you hear about us?</Text>
            <View className="border border-[#D0D5DD] rounded-md overflow-hidden flex-row">
              <TouchableOpacity
                className="bg-[#F9F9F9] border-r border-[#D0D5DD] flex-row items-center flex-1 rounded-md p-3 text-base font-circularMedium"
                onPress={() => setShowAdvertModal(true)} activeOpacity={0.7}
              >
                <Text className="font-circularMedium flex-1">{selectedAdvert.displayName}</Text>
                <Ionicons name="chevron-down-outline" size={16} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
          <InputField
            label="Referee Name"
            value={refereeName}
            onChangeText={setRefereeName}
            placeholder="Enter referee name"
          />
        </View>

        <Text className="text-center text-lg text-gray-500 mb-2 font-circular">
          By Proceeding, you agree to our <Text className="text-gray-950 underline">Terms</Text> and {"\n"} 
          acknowledge our <Text className="text-gray-950 underline">Privacy Policy</Text>.
        </Text>

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
      </ScrollView>

      <Modal
        visible={showAdvertModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAdvertModal(false)}
      >
        <View className="flex-1 justify-end bg-black/40 bg-opacity-50">
          <View className="bg-white rounded-t-3xl p-5 max-h-[80%]">
            <Text className="text-xl font-bold mb-3">Select an option</Text>
            <FlatList
              data={advert}
              renderItem={renderAdvert}
              keyExtractor={(item) => item.name}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const InputField = ({ label, ...props }) => (
  <View className="mb-6">
    <Text className="mb-1 font-circularMedium text-base text-gray-600">{label}</Text>
    <TextInput
      className="border border-[#D0D5DD] rounded-md p-2 px-3 text-base font-circular"
      {...props}
    />
  </View>
);

const PasswordField = ({ label, value, onChangeText, showPassword, toggleShowPassword }) => (
  <View className="mb-6">
    <Text className="mb-1 font-circularMedium text-base text-gray-600">{label}</Text>
    <View className="border border-[#D0D5DD] flex-row rounded-md p-2 px-3">
      <TextInput
        className="flex-1 text-base font-circularMedium"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        placeholder="Enter password"
      />
      <TouchableOpacity onPress={toggleShowPassword}>
        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#888" />
      </TouchableOpacity>
    </View>
  </View>
);

export default SignUp;

const styles = StyleSheet.create({
  phoneInputContainer: {
    width: '100%',
  },
  phoneInputTextContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 4
  },
})