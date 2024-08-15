import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, FlatList, Alert, Platform } from 'react-native';
import { ArrowRight2, Calendar, Cloud, DocumentUpload } from 'iconsax-react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import PhoneInput from 'react-native-international-phone-number';
import Checkbox from 'expo-checkbox';
import fields from '../../../../lib/fields';

const Stack = createStackNavigator();

const KYCSelectionScreen = ({ navigation }) => {
  const sections = [
    { id: 'required', title: 'Required Information', small: 'Carefully input the required information before submitting', submitText: 'Update Changes' },
    { id: 'company', title: 'Company Details', small: 'Please fill up this form if you have a company, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'mainContact', title: 'Main Contact', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'secondaryContact', title: 'Secondary Contact', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'incomeDetails', title: 'Income Details', small: 'Carefully input the required information before submitting', submitText: 'Update Changes' },
    { id: 'previousAccountant', title: 'Previous Accountant', small: 'Please fill up this form if you have a company, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'otherDetails', title: 'Other Details', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'serviceRequired', title: 'Service Required', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'accountReturnDetails', title: 'Accounts and Return Details', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Update Changes' },
    { id: 'confirmationStatement', title: 'Comfirmation Statement', small: 'Please fill up this form if you have a company, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'vatDetails', title: 'VAT Details', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'payeDetails', title: 'PAYE Details', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'autoEnrollment', title: 'Auto-Enrollment', small: 'Carefully input the required information before submitting', submitText: 'Update Changes' },
    { id: 'pid', title: 'PID', small: 'Please fill up this form if you have a company, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'registration', title: 'Registration', small: 'To receive accounting services from Newington, you must carefully read and sign our letter of engagement.', submitText: 'Submit Details' },
    { id: 'identityVerification', title: 'Identity Verification', small: `Before you can receive accounting services from Newinton we are required by law to verify your identity. \n \n To do this, you'll have to upload a valid government-issued ID like an`, submitText: 'Submit Details' },
  ];

  return (
    <ScrollView className="flex-1 bg-[#F7F7F7]">
      <Text className="text-base font-circular text-gray-600 p-5">Kindly provide us with as much information as possible to help us do your accounting better</Text>
      <View className="bg-white p-5 pt-0">
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            className="py-4 flex-row items-center justify-between border-b border-gray-200"
            onPress={() => navigation.navigate('KYCForm', { sectionId: section.id, title: section.title, small: section.small, submitText: section.submitText })}
          >
            <View>
              <Text className="text-base font-circularMedium mb-1">{section.title}</Text>
              <Text className="text-xs font-circular bg-green-100 self-start text-green-600 p-1 px-2 rounded-lg">Submitted</Text>
            </View>
            <ArrowRight2 size={18} color='#98A1B3' />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const KYCFormScreen = ({ route }) => {
  const { sectionId, title, small, submitText } = route.params;
  const [formData, setFormData] = useState({ "Full Name": "Charles Emmanuel" });
  const [phoneData, setPhoneData] = useState({});
  const [showAdvertModal, setShowAdvertModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDateField, setCurrentDateField] = useState('');
  const [selectedAdvert, setSelectedAdvert] = useState({ name: 'Select an option', id: null });
  const [ doc, setDoc ] = useState();

  const adverts = [
    { name: 'Private Limited Company', id: 'private_limited' },
    { name: 'Limited Liability Company', id: 'llc' },
    { name: 'Trademark License', id: 'trademark' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const selectAdvert = (item) => {
    setSelectedAdvert(item);
    setShowAdvertModal(false);
    handleInputChange('advertSource', item.id);
  };

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || formData[currentDateField];
    setShowDatePicker(false);
    handleInputChange(currentDateField, currentDate);
  };

  const handleCheckboxChange = (fieldName) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: !prevData[fieldName]
    }));
  };

  const handlePhoneChange = (field, phoneNumber) => {
    setPhoneData(prevData => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        phoneNumber
      }
    }));
  };

  const handleCountryChange = (field, country) => {
    setPhoneData(prevData => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        country
      }
    }));
  };

  const formatPhoneNumber = (field) => {
    const { phoneNumber, country } = phoneData[field] || {};
    if (phoneNumber && country) {
      // Remove any non-digit characters from the phone number
      const cleanNumber = phoneNumber.replace(/\D/g, '');
      // Format the phone number with the country code
      return `${country.callingCode}${cleanNumber}`;
    }
    return '';
  };

  const openPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      });
  
      if (!result.canceled) {
        const { uri, name, type, size } = result.assets[0];
        setFormData(prevData => ({
          ...prevData,
          document: {
            uri,
            name,
            type,
            size,
          },
        }));
      } else {
        console.log("No PDFs uploaded");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleSubmit = () => {
    const formattedData = { ...formData };
    
    // Format phone numbers
    Object.keys(phoneData).forEach(field => {
      formattedData[field] = formatPhoneNumber(field);
    });

    console.log('Submitting form data:', formattedData);
    // Here you would typically send the formatted data to your backend
  };

  return (
    <ScrollView className="flex-1 bg-[#F7F7F7] p-4">
      <Text className="text-2xl font-circularMedium text-gray-900 mb-2">{title}</Text>
      <Text className="text-base font-circular text-gray-600 mb-6">{small}</Text>
      {fields[sectionId].map((field) => (
        <View key={field.name} className="mb-6 flex-1">
          {field.type === 'text' && (
            <>
              <Text className="mb-1 font-circularMedium text-base text-gray-600">{field.name}</Text>
              <TextInput 
                className={`border border-[#D0D5DD] rounded-md p-2 px-3 text-base font-circular ${field.multiline ? "h-24" : ""}`}
                value={formData[field.name] || ''}
                textAlignVertical={field.multiline ? "top" : "center"}
                onChangeText={(value) => handleInputChange(field.name, value)}
                editable={field.editable !== false}
                multiline={field.multiline}
                placeholder={field.placeholder}
              />
            </>
          )}
          {field.type === 'checkbox' && (
            <TouchableOpacity onPress={() => handleCheckboxChange(field.name)} className="flex-row items-center">
              <Checkbox
                value={formData[field.name] || false}
                onValueChange={() => handleCheckboxChange(field.name)}
                className="mr-2"
              />
              <Text className="font-circular text-base text-gray-800">{field.name}</Text>
            </TouchableOpacity>
          )}
          {field.type === 'dropdown' && (
            <>
              <Text className="mb-1 font-circularMedium text-base text-gray-600">{field.name}</Text>
              <TouchableOpacity
                className="border border-[#D0D5DD] rounded-md overflow-hidden flex-row items-center p-3"
                onPress={() => setShowAdvertModal(true)}
              >
                <Text className="font-circularMedium flex-1 text-base">{selectedAdvert.name}</Text>
                <Ionicons name="chevron-down-outline" size={16} color="#888" />
              </TouchableOpacity>
            </>
          )}
          {field.type === 'phone' && (
            <>
              <Text className="mb-1 font-circularMedium text-base text-gray-600">{field.name}</Text>
              <PhoneInput
                value={phoneData[field.name]?.phoneNumber || ''}
                onChangePhoneNumber={(phoneNumber) => handlePhoneChange(field.name, phoneNumber)}
                selectedCountry={phoneData[field.name]?.country}
                onChangeSelectedCountry={(country) => handleCountryChange(field.name, country)}
                placeholder={field.placeholder || 'Enter phone number'}
                phoneInputStyles={{
                  container: 'border border-[#D0D5DD] rounded-md overflow-hidden',
                  flagContainer: 'bg-gray-100 border-r border-[#D0D5DD]',
                  textInput: 'flex-1 p-2 px-3 text-base font-circular',
                }} 
              />
            </>
          )}
          {field.type === 'date' && (
            <>
              <Text className="mb-1 font-circularMedium text-base text-gray-600">{field.name}</Text>
              <TouchableOpacity 
                className="border border-[#D0D5DD] flex-row rounded-md items-center p-3 justify-between"
                onPress={() => {
                  setCurrentDateField(field.name);
                  setShowDatePicker(true);
                }}
              >
                <Text className="font-circularMedium text-base">{formData[field.name]?.toLocaleDateString() || 'Select a date'}</Text>
                <Calendar color='#101828' size={20} />
              </TouchableOpacity>
            </>
          )}
          {field.name === 'Letter of Engagement' && (
            <TouchableOpacity className="bg-[#FFFFFF] p-4 rounded-lg mb-4 space-y-3" activeOpacity={0.6}>
              <Text className="font-circular text-sm">Letter of Engagement</Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <DocumentUpload size="24" color="#37A19A" variant="Bold"/>
                  <Text className="font-circular text-[#101828] text-sm ml-2">PDF</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name='cloud-download-outline' color={"#37A19A"} size={24} />
                </View>
              </View>
            </TouchableOpacity>
          )}
          {field.type === 'file' && (
            <>
              <TouchableOpacity 
                className="border border-[#D0D5DD] flex-row rounded-md items-center p-3 justify-between"
                onPress={openPicker}
              >
                {formData.document ? (
                  <Text>{formData.document.name}</Text>
                ) : (
                  <View className="w-full h-36 rounded-md flex justify-center items-center space-x-2">
                    <DocumentUpload size="24" color="#37A19A" variant="Bulk"/>
                    <Text className="font-circular text-base text[#667085] mt-1">Upload signed document</Text>
                  </View>
                )}
              </TouchableOpacity>
            </>
          )}
          {field.options === true && (
            <View className="min-h-[300px]">
              <View className="flex-row items-center">
                <Text className="mr-2 text-4xl">•</Text>
                <Text className="font-circular text-base text-[#101828] mb-2">International Passport</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="mr-2 text-4xl">•</Text>
                <Text className="font-circular text-base text-[#101828] mb-2">Driver's License</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="mr-2 text-4xl">•</Text>
                <Text className="font-circular text-base text-[#101828] mb-2">National ID</Text>
              </View>
            </View>
          )}
          {field.prefix === "€" && (
            <>
              <Text className="mb-1 font-circularMedium text-base text-gray-600">{field.name}</Text>
              <View className="border border-[#D0D5DD] rounded-md overflow-hidden flex-row">
                <View className="bg-[#F9F9F9] border-r border-[#D0D5DD] flex-row items-center px-2">
                  <Text className="font-circularMedium text-[#344054] px-2 text-base">€</Text>
                </View>
                <TextInput 
                  className={`rounded-md p-2 px-3 text-base font-circular flex-1`}
                  value={formData[field.name]}
                  onChangeText={(value) => handleInputChange(field.name, value)}
                  placeholder={field.placeholder}
                />
              </View>
            </>
          )}
        </View>
      ))}

      <TouchableOpacity
        className="bg-teal-500 p-4 mt-8 rounded-full"
        onPress={handleSubmit}
        activeOpacity={0.7}
      >
        <Text className="font-circularMedium text-white text-center text-lg">{submitText}</Text>
      </TouchableOpacity>

      <Modal
        visible={showAdvertModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAdvertModal(false)}
      >
        <View className="flex-1 bg-black/30 bg-opacity-50 justify-end">
          <View className="bg-white py-5 rounded-t-lg">
            <FlatList
              data={adverts}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-5 py-2"
                  onPress={() => selectAdvert(item)}
                >
                  <Text className="text-base font-circularMedium">{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {showDatePicker && (
        <DateTimePicker
          value={formData[currentDateField] || new Date()}
          mode="date"
          display="default"
          onChange={handleDateSelect}
        />
      )}

      <View className="py-10" />
    </ScrollView>
  );
};

const KYCApp = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="KYCSelection" component={KYCSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen 
          name="KYCForm" 
          component={KYCFormScreen} 
          options={({ route }) => ({ title: route.params.title, headerShown: false })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default KYCApp;