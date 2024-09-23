import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, FlatList, Alert, Platform, ActivityIndicator } from 'react-native';
import { ArrowRight2, Calendar, Cloud, DocumentUpload } from 'iconsax-react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import PhoneInput from 'react-native-international-phone-number';
import Checkbox from 'expo-checkbox';
import fields from '../../../../lib/fields';
import * as SecureStore from 'expo-secure-store';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import Toast from 'react-native-toast-message';
import { useNavigation } from 'expo-router';

const Stack = createStackNavigator();

const KYCSelectionScreen = ({ navigation }) => {
  const sections = [
    { id: 'required_information', title: 'Required Information', small: 'Carefully input the required information before submitting', submitText: 'Update Changes' },
    { id: 'company_details', title: 'Company Details', small: 'Please fill up this form if you have a company, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'main_contact', title: 'Main Contact', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'secondary_contact', title: 'Secondary Contact', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'income_details', title: 'Income Details', small: 'Carefully input the required information before submitting', submitText: 'Update Changes' },
    { id: 'previous_accountant', title: 'Previous Accountant', small: 'Please fill up this form if you have a company, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'other_details', title: 'Other Details', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'services_required', title: 'Service Required', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'accounts_and_returns_details', title: 'Accounts and Return Details', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Update Changes' },
    { id: 'confirmation_statement', title: 'Comfirmation Statement', small: 'Please fill up this form if you have a company, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'vat_details', title: 'VAT Details', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'paye_details', title: 'PAYE Details', small: 'Please fill up this form, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
    { id: 'auto_enrolment', title: 'Auto-Enrollment', small: 'Carefully input the required information before submitting', submitText: 'Update Changes' },
    { id: 'p11d', title: 'PID', small: 'Please fill up this form if you have a company, also note that it is okay for you to give us only the information you have access to currently.', submitText: 'Submit Details' },
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
  const { user } = useGlobalContext();
  const { sectionId, title, small, submitText } = route.params;
  const [formData, setFormData] = useState({ "Full Name": `${user.meta_data.fullName}` });
  const [phoneData, setPhoneData] = useState({});
  const [showAdvertModal, setShowAdvertModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDateField, setCurrentDateField] = useState('');
  const [ loadingSubmit, setLoadingSubmit ] = useState(false);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState({});
  // State to track selected values for each dropdown
  const [selectedValues, setSelectedValues] = useState({ name: 'Select an option', id: null });

  const adverts = [
    { name: 'Private Limited Company', id: 'private_limited' },
    { name: 'Limited Liability Company', id: 'llc' },
    { name: 'Trademark License', id: 'trademark' },
  ];

  // Function to select advert for a specific field
  const selectAdvert = (fieldName, item) => {
    // Update the selected value for the specific field
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [fieldName]: item.name,
    }));

    // Close the specific modal
    setShowModal((prevShowModal) => ({
      ...prevShowModal,
      [fieldName]: false,
    }));

    handleInputChange(fieldName, item);
  };

  // Function to open a specific modal
  const openModal = (fieldName) => {
    setShowModal((prevShowModal) => ({
      ...prevShowModal,
      [fieldName]: true,
    }));
  };

  // Function to render the dropdown field
  const renderDropdownField = (field) => (
    <>
      <Text className="mb-1 font-circularMedium text-base text-gray-600">{field.name}</Text>
      <TouchableOpacity
        className="border border-[#D0D5DD] rounded-md overflow-hidden flex-row items-center p-3"
        onPress={() => openModal(field.name)} // Open specific modal
      >
        <Text className="font-circularMedium flex-1 text-base">
          {selectedValues[field.name] || 'Select an option'}
        </Text>
        <Ionicons name="chevron-down-outline" size={16} color="#888" />
      </TouchableOpacity>

      {/* Modal to select an advert */}
      <Modal
        visible={showModal[field.name] || false} // Control visibility of the specific modal
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal((prev) => ({ ...prev, [field.name]: false }))}
      >
        <View className="flex-1 bg-black/30 bg-opacity-50 justify-end">
          <View className="bg-white py-5 rounded-t-lg">
            <FlatList
              data={adverts}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-5 py-2"
                  onPress={() => selectAdvert(field.name, item)} // Pass field name
                >
                  <Text className="text-base font-circularMedium">{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
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

  const validateFormData = () => {
    let isValid = true;
    fields[sectionId].forEach(field => {
      if (!formData[field.name]) {
        Alert.alert(`${field.name} is required`);
        isValid = false;
      }
    });
    return isValid;
  };
  
  const handleSubmit = async () => {
    setLoadingSubmit(true)
    // Show loading toast
    Toast.show({
      type: 'info',
      text1: 'Submitting...',
      text2: 'Please wait while we process your request.',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 40,
    });
  
    const kycInformation = {};
    
    if (sectionId === 'services_required') {
      // Handle services_required specifically, directly assigning to kycData
      kycInformation.services_required = fields[sectionId]
        .filter(field => field.type === 'checkbox' && formData[field.name])
        .map(field => field.name);
    } else {
      // Handle other sections as before
      fields[sectionId].forEach((field) => {
        if (field.type === 'text' || field.type === 'checkbox') {
          kycInformation[field.id] = formData[field.name]; 
        } else if (field.type === 'dropdown') {
          kycInformation[field.id] = formData[field.name]?.name; 
        } else if (field.type === 'phone') {
          kycInformation[field.id] = formatPhoneNumber(formData[field.name]); 
        } else if (field.type === 'date') {
          kycInformation[field.id] = formData[field.name]; 
        } else if (field.type === 'file') {
          kycInformation[field.id] = formData.document?.uri; 
        }
      });
    }
  
    // Dynamically set the nested key based on sectionId
    const kycData = { kyc_information: {} };
    if (sectionId === 'services_required') {
      kycData.kyc_information[sectionId] = kycInformation.services_required; // Assign directly
    } else {
      kycData.kyc_information[sectionId] = kycInformation; // Handle other sections
    }
  
    const token = await SecureStore.getItemAsync('userToken');
    try {
      const response = await fetch('https://newinton-backend-service.onrender.com/api/v1/accounts/update-kyc-information', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(kycData), 
      });

      console.log(kycData)
  
      if (response.ok) {
        setLoadingSubmit(false)
        // Show success toast
        Toast.show({
          type: 'success',
          text1: 'Submission Successful',
          text2: 'KYC details have been submitted.',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
        });
        navigation.navigate("KYCSelection");
      } else {
        setLoadingSubmit(false)
        const errorData = await response.json();
        console.log(errorData)
        // Show error toast
        Toast.show({
          type: 'error',
          text1: 'Submission Failed',
          text2: `Error updating KYC information: Please fill in all fields`,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      console.log(error)
      setLoadingSubmit(false)
      // Show error toast for network or other errors
      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: `Error: ${error.message}`,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
    }
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
          {/* {field.type === 'dropdown' && (
            <>
              <Text className="mb-1 font-circularMedium text-base text-gray-600">{field.name}</Text>
              <TouchableOpacity
                className="border border-[#D0D5DD] rounded-md overflow-hidden flex-row items-center p-3"
                onPress={() => setShowAdvertModal(true)}
              >
                <Text className="font-circularMedium flex-1 text-base">{formData[field.name] && formData[field.name].name}</Text>
                <Ionicons name="chevron-down-outline" size={16} color="#888" />
              </TouchableOpacity>
            </>
          )} */}
          {field.type === 'dropdown' && renderDropdownField(field)}

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
                  <Text>{formData.document.name} ({(formData.document.size / 1024).toFixed(2)} KB)</Text>
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
        {loadingSubmit ? (
          <ActivityIndicator size={20} color={"#D0D5DD"} /> 
        ) : (
          <Text className="font-circularMedium text-white text-center text-lg">{submitText}</Text>
        )}
      </TouchableOpacity>
{/* 
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
      </Modal> */}

      {showDatePicker && (
        <DateTimePicker
          value={formData[currentDateField] || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
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