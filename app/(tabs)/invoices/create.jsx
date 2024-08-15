import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, FlatList, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ArrowLeft, Calendar, Trash } from 'iconsax-react-native';
import InvoiceDetailsView from '../../../components/InvoiceDetailsView';

const countryCodes = [
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  // Add more country codes as needed
];

const Create = () => {
  const navigation = useNavigation();
  const [invoice, setInvoice] = useState({
    raisedBy: 'Leonard Ogbu',
    email: 'kenoekezie@gmail.com',
    phoneNumber: '',
    address: '',
    issuedDate: new Date(),
    dueDate: new Date(),
    issuedTo: '',
    totalAmount: '15000',
    amountDue: '5000',
    items: [{ description: '', amount: '' }],
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [currentDateField, setCurrentDateField] = useState(null);

  const updateInvoice = (field, value) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  const updateItem = (index, field, value) => {
    const updatedItems = invoice.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setInvoice(prev => ({ ...prev, items: updatedItems }));
  };

  const handleAddItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', amount: '' }]
    }));
  };

  const deleteItem = (index) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || invoice[currentDateField];
    setShowDatePicker(false);
    setShowDueDatePicker(false);
    updateInvoice(currentDateField, currentDate);
  };

  const handleDatePress = (dateType) => {
    setCurrentDateField(dateType);
    if (dateType === 'issuedDate') {
      setShowDatePicker(true);
    } else {
      setShowDueDatePicker(true);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

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
    navigation.navigate("verify/otp", { from: "sign-up" });
  };

  return (
    <SafeAreaView className="flex-1 h-full bg-[#F7F7F7]">
      <ScrollView contentContainerStyle={styles.scrollContent} className="flex-1 gap-y-4">
        <View className="mt-6 mb-2">
          <Text className="font-circularBold mb-2 text-3xl">Create an invoice</Text>
        </View>

        <View className="mb-8">
          <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-[#344054]">Raised by</Text>
            <TextInput
              className="border border-[#D0D5DD] bg-[#fff] rounded-md p-2 px-3 text-base font-circular"
              placeholder="Enter first name"
              value={invoice.raisedBy} editable={false}
            />
          </View>

          <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-[#344054]">Phone number</Text>
            <View className="border border-[#D0D5DD] rounded-md overflow-hidden flex-row">
              <TouchableOpacity
                className="bg-[#F9F9F9] border-r border-[#D0D5DD] flex-row items-center px-2"
                onPress={() => setShowCountryModal(true)} activeOpacity={0.7}
              >
                <Text style={styles.countryCodeText} className="font-circularMedium">{selectedCountry.flag}</Text>
                <Ionicons name="chevron-down-outline" size={16} color="#888" />
              </TouchableOpacity>
              <TextInput
                className="flex-1 bg-white p-2 px-3 text-base font-circularMedium"
                placeholder="(555) 000-0000"
                value={invoice.phoneNumber}
                onChangeText={(text) => updateInvoice('phoneNumber', text)}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-[#344054]">Your address</Text>
            <TextInput
              className="border border-[#D0D5DD] bg-white rounded-md p-2 px-3 text-base font-circularMedium"
              placeholder="Enter your address"
              value={invoice.address}
              onChangeText={(text) => updateInvoice('address', text)}
              keyboardType="default"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-[#344054]">Issued date</Text>
            <TouchableOpacity 
              className="border border-[#D0D5DD] bg-white flex-row rounded-md items-center p-3 justify-between"
              onPress={() => handleDatePress('issuedDate')}
            >
              <Text className="font-circularMedium text-base">{invoice.issuedDate.toLocaleDateString()}</Text>
              <Calendar color='#101828' size={20} />
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <Text className="mb-1 font-circularMedium text-base text-[#344054]">Due date</Text>
            <TouchableOpacity 
              className="border border-[#D0D5DD] bg-white flex-row rounded-md items-center p-3 justify-between"
              onPress={() => handleDatePress('dueDate')}
            >
              <Text className="font-circularMedium text-base">{invoice.dueDate.toLocaleDateString()}</Text>
              <Calendar color='#101828' size={20} />
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <KeyboardAvoidingView
              behavior={Platform.OS === "android" ? 'height' : 'padding'}
              keyboardVerticalOffset={Platform.OS === 'android' ? 20 : 64}
            >
              <View className="">
                <Text className="font-circularMedium text-base text-[#344054] mb-1">
                  Issued to
                </Text>
                <TextInput
                  className="border border-[#D0D5DD] bg-white h-36 rounded-md p-3 text-lg font-circular"
                  multiline={true}
                  style={styles.textInput}
                  placeholder="E.g Newinton Accountancy Limited, 9 Chapel, London"
                  scrollEnabled={true}
                  textAlignVertical="top"
                  value={invoice.issuedTo}
                  onChangeText={(text) => updateInvoice('issuedTo', text)}
                />
              </View>
            </KeyboardAvoidingView>
          </View>

          {invoice.items.map((item, index) => (
            <View key={index}>
              <View className="mb-6">
                <KeyboardAvoidingView
                  behavior={Platform.OS === "android" ? 'height' : 'padding'}
                  keyboardVerticalOffset={Platform.OS === 'android' ? 20 : 64}
                >
                  <View>
                    <Text className="font-circularMedium text-base text-[#344054] mb-1">
                      Item {index + 1} Description
                    </Text>
                    <TextInput
                      className="border border-[#D0D5DD] bg-white h-36 rounded-md p-3 text-base font-circular"
                      multiline={true} textAlignVertical='top'
                      placeholder="E.g Newinton Accountancy Limited, 9 Chapel, London"
                      value={item.description}
                      onChangeText={(text) => updateItem(index, 'description', text)}
                    />
                  </View>
                </KeyboardAvoidingView>
              </View>

              <View className="mb-6">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="font-circularMedium text-base text-[#344054] mb-1">
                    Item {index + 1} Amount
                  </Text>
                  {invoice.items.length > 1 && (
                    <TouchableOpacity onPress={() => deleteItem(index)}>
                      <Trash size={18} color="#f04438" variant="Outline"/>
                    </TouchableOpacity>
                  )}
                </View>
                <View className="border border-[#D0D5DD] rounded-md overflow-hidden flex-row">
                  <View className="bg-[#F9F9F9] border-r border-[#D0D5DD] flex-row items-center px-2">
                    <Text className="font-circularMedium text-[#344054] px-2 text-base">€</Text>
                  </View>
                  <TextInput
                    className="flex-1 bg-white p-2 px-3 text-base font-circularMedium"
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={item.amount}
                    onChangeText={(text) => updateItem(index, 'amount', text)}
                  />
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity onPress={handleAddItem} className="self-start rounded-md">
            <Text className="text-[#4EB1B3] font-circularMedium text-base">+ New Row</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={submit} className="text-center bg-[#4EB1B3] p-4 mb-0 rounded-full">
          <Text className="font-circular text-white text-center text-base">Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePreview}>
          <Text className="font-circularMedium text-[#4EB1B3] text-center text-base">Preview Invoice</Text>
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

      {(showDatePicker || showDueDatePicker) && (
        <DateTimePicker
          value={invoice[currentDateField]}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date(2300, 10, 20)}
          minimumDate={new Date(1950, 0, 1)}
        />
      )}

      <Modal visible={showPreview} animationType="slide">
        <SafeAreaView className="flex-1 bg-[#F7F7F7]">
          <View className="p-5">
            <TouchableOpacity onPress={() => setShowPreview(false)} className="flex-row items-center mb-4">
              <ArrowLeft size={26} color="#101828" />
            </TouchableOpacity>
            <View className="flex-row items-center justify-between">
              <Text className="font-circularBold text-2xl">Invoice</Text>
              <Text className="bg-[#E3FCEE] text-[#109146] px-2 py-1 rounded-lg font-circular">Draft</Text>
            </View>
          </View>
          <InvoiceDetailsView invoice={invoice} isPreview={true} />
        </SafeAreaView>
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
  textInput: {
    borderColor: "#D0D5DD",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top", // Ensures text starts at the top-left corner
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

export default Create;