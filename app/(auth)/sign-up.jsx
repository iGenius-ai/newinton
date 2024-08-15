import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';

const countryCodes = [
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  // Add more country codes as needed
];

const advert = [
  { name: 'Word of Mouth' },
  { name: 'WhatsApp' },
  { name: 'Twitter' },
  { name: 'YouTube' },
  { name: 'LinkedIn' },
  { name: 'Google Advert' },
]

const SignUp = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [retypePassword, setRetypePassword] = useState('');
  const [showRetypePassword, setShowRetypePassword] = useState(false)
  const [referralSource, setReferralSource] = useState('');
  const [refereeName, setRefereeName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [selectedAdvert, setSelectedAdvert] = useState(advert[0]);
  const [showAdvertModal, setShowAdvertModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setSelectedCountry(item);
        setShowCountryModal(false);
      }}
    >
      <Text style={styles.countryItemText}>{item.flag} {item.code} {item.name}</Text>
    </TouchableOpacity>
  );

  const renderAdvert = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setSelectedAdvert(item);
        setShowAdvertModal(false);
      }}
    >
      <Text style={styles.countryItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const submit = () => {
    navigation.navigate("verify/otp", { from: "sign-up" });
  };

  return (
    <SafeAreaView className="flex-1 h-full bg-white">
      <ScrollView contentContainerStyle={styles.scrollContent} className="flex-1 gap-y-4 mt-10">
        <View className="mt-6">
          <Text className="font-circularBold mb-2 text-3xl">Create your account</Text>
          <Text className="mb-5 font-circular text-lg text-gray-500">
            Have an account? <Link href={"/(auth)/sign-in"} className="text-[#4EB1B3]">Login</Link>
          </Text>
        </View>

        <View>
          <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-gray-600">Full Name</Text>
            <TextInput
              className="border border-[#D0D5DD] rounded-md p-2 px-3 text-base font-circular"
              placeholder="Enter first name"
              value={fullName}
              onChangeText={setFullName}
              keyboardType="default"
              autoCapitalize="none"
            />
          </View>
          <View className="mb-6">
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
          <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-gray-600">Phone number</Text>
            <View className="border border-[#D0D5DD] rounded-md overflow-hidden flex-row">
              <TouchableOpacity
                className="bg-[#F9F9F9] border-r border-[#D0D5DD] flex-row items-center px-2"
                onPress={() => setShowCountryModal(true)} activeOpacity={0.7}
              >
                <Text style={styles.countryCodeText} className="font-circularMedium">{selectedCountry.flag} {/* {selectedCountry.code} */}</Text>
                <Ionicons name="chevron-down-outline" size={16} color="#888" />
              </TouchableOpacity>
              <TextInput
                className="flex-1 rounded-md p-2 px-3 text-base font-circularMedium"
                placeholder="(555) 000-0000"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>
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
          <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-gray-600">How did you hear about us?</Text>
            <View className="border border-[#D0D5DD] rounded-md overflow-hidden flex-row">
              <TouchableOpacity
                className="bg-[#F9F9F9] border-r border-[#D0D5DD] flex-row items-center flex-1 rounded-md p-3 text-base font-circularMedium"
                onPress={() => setShowAdvertModal(true)} activeOpacity={0.7}
              >
                <Text style={styles.countryCodeText} className="font-circularMedium flex-1">{selectedAdvert.name}</Text>
                <Ionicons name="chevron-down-outline" size={16} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-gray-600">Referee Name</Text>
            <TextInput
              className="border border-[#D0D5DD] rounded-md p-2 px-3 text-base font-circularMedium"
              placeholder="Enter referee name"
              value={refereeName}
              onChangeText={setRefereeName}
              keyboardType="default"
            />
          </View>
        </View>

        <Text className="text-center text-lg text-gray-500 mb-2 font-circular">
          By Proceeding, you agree to our <Text className="text-gray-950 underline">Terms</Text> and {"\n"} 
          acknowledge our <Text className="text-gray-950 underline">Privacy Policy</Text>.
        </Text>

        <TouchableOpacity onPress={submit} className="text-center bg-[#4EB1B3] p-4 mb-4 rounded-full">
          <Text className="font-circular text-white text-center text-lg">Create new account</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showCountryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCountryModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <FlatList
              data={countryCodes}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={showAdvertModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAdvertModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select an option</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
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
  loginLink: {
    color: '#4EB1B3',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  countryCodeDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 5,
  },
  phoneNumberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  countryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  countryItemText: {
    fontSize: 16,
  },
});

export default SignUp;