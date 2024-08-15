import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, TextInput, KeyboardAvoidingView, Platform, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useNavigation } from "expo-router";

const advert = [
  { name: "Word of Mouth" },
  { name: "WhatsApp" },
  { name: "Twitter" },
  { name: "YouTube" },
  { name: "LinkedIn" },
  { name: "Google Advert" },
];

const CreateProfile = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedAdvert, setSelectedAdvert] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [showAdvertModal, setShowAdvertModal] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const items = [
    { id: 1, label: "Item 1", details: "Tax advice" },
    { id: 2, label: "Item 2", details: "Company account" },
    { id: 3, label: "Item 3", details: "VAT returns" },
    { id: 4, label: "Item 4", details: "Book keeping" },
    { id: 5, label: "Item 5", details: "CT600" },
    { id: 6, label: "Item 6", details: "Payroll" },
    { id: 7, label: "Item 7", details: "Auto-enrollment" },
    { id: 8, label: "Item 8", details: "Confirmation statement" },
    { id: 9, label: "Item 9", details: "Management accounts" },
    { id: 10, label: "Item 10", details: "CIS" },
    { id: 11, label: "Item 11", details: "Fee protection service" },
    { id: 12, label: "Item 12", details: "Registered address" },
    { id: 13, label: "Item 13", details: "Bill payment" },
    { id: 14, label: "Item 14", details: "Consultation/Advice" },
    { id: 15, label: "Item 15", details: "Software" },
  ];

  useEffect(() => {
    setIsSubmitEnabled(selectedAdvert !== "" && selectedItem.length > 0);
  }, [selectedAdvert, selectedItem]);

  const handleSelectItem = (item) => {
    const isSelected = selectedItem.includes(item.id);
    if (isSelected) {
      setSelectedItem(selectedItem.filter((id) => id !== item.id));
    } else {
      setSelectedItem([...selectedItem, item.id]);
    }
  };

  const handleSubmit = () => {
    navigation.navigate("verify/success");
  }

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

  return (
    <>
      <SafeAreaView className="bg-white flex-1">
        <View className="-mt-10 p-5">
          <View className="gap-y-8">
            <View>
              <Text className="font-circularBold mb-1 text-3xl">
                Tell us a bit about you
              </Text>
              <Text className="text-lg font-circular text-gray-500 mt-2">
                Give us the following information to help us serve you better.
              </Text>
            </View>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View className="mb-6 px-5">
            <Text className="mb-1 font-circularMedium text-lg text-gray-600">
              Which of these describes you better?
            </Text>
            <View className="border border-[#D0D5DD] rounded-md overflow-hidden flex-row">
              <TouchableOpacity
                className="bg-gray-50 border-r border-[#D0D5DD] flex-row items-center flex-1 rounded-md p-3 text-base font-circularMedium"
                onPress={() => setShowAdvertModal(true)}
                activeOpacity={0.7}
              >
                <Text
                  style={styles.countryCodeText}
                  className={`font-circularMedium flex-1 ${
                    selectedAdvert ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {selectedAdvert?.name || "-- Select an option --"}
                </Text>
                <Ionicons
                  name="chevron-down-outline"
                  size={16}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            <View className="mt-6">
              <Text className="font-circular text-lg">Select service type</Text>
              <Text className="font-circular text-lg mt-1 text-gray-500">
                Tell us the type of services you would love to get from
                Newinton Accountancy
              </Text>
            </View>
          </View>

          {items.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleSelectItem(item)}>
              <View className="px-5 flex-row items-center mb-4">
                <Checkbox value={selectedItem.includes(item.id)} />
                <Text className="ml-2 font-circular text-lg text-gray-800">
                  {item.details}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? 'height' : 'padding'}
            keyboardVerticalOffset={Platform.OS === 'android' ? 20 : 64}
          >
            <View className="px-5 mb-10">
              <Text className="font-circularBold text-lg mb-1">
                Additional Information
              </Text>
              <TextInput
                className="border border-[#D0D5DD] h-36 rounded-md p-3 text-lg font-circular"
                multiline={true}
                style={styles.textInput}
                placeholder="Tell us what you think we need to know"
                scrollEnabled={true}
                textAlignVertical="top"
                value={extraInfo}
                onChangeText={setExtraInfo}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

        <TouchableOpacity onPress={handleSubmit}
          className={`items-center transition-all duration-300 ease-in-out p-4 m-5 rounded-full bg-[#4EB1B3] ${isSubmitEnabled ? 'opacity-100' : 'opacity-20'}`}
          disabled={!isSubmitEnabled}
        >
          <Text className={`font-circularMedium transition-all duration-300 ease-in-out text-lg ${isSubmitEnabled ? 'text-white' : 'text-gray-500'}`}>
            Submit credentials
          </Text>
        </TouchableOpacity>

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
    </>
  );
};

const styles = StyleSheet.create({
  countryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  countryItemText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  countryCodeText: {
    fontSize: 16,
  },
  textInput: {
    borderColor: "#D0D5DD",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top", // Ensures text starts at the top-left corner
  },
});

export default CreateProfile;
