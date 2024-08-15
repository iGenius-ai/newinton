import { useState } from "react";
import { Link, router, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const countryCodes = [
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  // Add more country codes as needed
];

const Reset = () => {
  const navigation = useNavigation();
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

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

  const submit = () => {
    navigation.navigate("verify/otp", { from: "reset" });
  };

  return (
    <SafeAreaView className="bg-white flex-1 h-full">
      <View className="-mt-10 p-5 flex-1">
        <View className="gap-y-8">
          <View>
            <Text className="font-circularBold mb-2 text-3xl">Reset password</Text>
            <Text className="text-xl font-circular text-gray-400 mt-2">
              Please provide your Newinton Accountancy registered phone number
            </Text>
          </View>

          <View>
            <Text className="mb-1 font-circularMedium text-base text-gray-600">Phone number</Text>
            <View className="border border-[#D0D5DD] rounded-md overflow-hidden flex-row">
              <TouchableOpacity
                className="bg-[#F9F9F9] border-r border-[#D0D5DD] flex-row items-center px-2"
                onPress={() => setShowCountryModal(true)} activeOpacity={0.7}
              >
                <Text style={styles.countryItemText} className="font-circularMedium">{selectedCountry.flag} {/* {selectedCountry.code} */}</Text>
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

          <TouchableOpacity className="items-center bg-[#4EB1B3] p-4 mb-4 rounded-full" onPress={submit} asChild>
            <Text className="font-circularMedium text-white text-lg">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showCountryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCountryModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className="font-circularMedium" style={styles.modalTitle}>Select Country</Text>
            <FlatList
              data={countryCodes}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Reset;

const styles = StyleSheet.create({
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
    marginBottom: 10,
  },
  countryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  countryItemText: {
    fontSize: 16,
    fontFamily: "CircularStd-Book"
  },
});