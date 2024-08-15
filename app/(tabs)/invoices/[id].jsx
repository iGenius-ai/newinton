import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DocumentUpload, InfoCircle } from 'iconsax-react-native';
import invoiceData from '../../../lib/invoiceData';

const InvoiceDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const invoice = invoiceData.find(inv => inv.id === id);

  if (!invoice) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-5">
          <Text className="font-circularBold text-2xl mb-2">Invoice not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const HookStatusBadge = ({ status }) => {
    const getStatusStyle = (status) => {
      switch (status) {
        case 'pending':
          return {
            text: 'Payment pending',
            textColor: 'text-[#97750F]',
            bgColor: 'bg-[#FCF1CF]'
          };
        case 'approved':
          return {
            text: 'Payment approved',
            textColor: 'text-[#109146]',
            bgColor: 'bg-[#E3FCEE]'
          };
        case 'declined':
          return {
            text: 'Payment declined',
            textColor: 'text-[#B42318]',
            bgColor: 'bg-[#FEF3F2]'
          };
        default:
          return {
            text: 'Unknown status',
            textColor: 'text-[#344054]',
            bgColor: 'bg-[#F2F4F7]'
          };
      }
    };

    const { text, textColor, bgColor } = getStatusStyle(status);

    return (
      <Text className={`${textColor} ${bgColor} px-2 py-1 rounded-lg font-circular`}>
        {text}
      </Text>
    );
  };


  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F7]">
      <ScrollView className="flex-1">
        <View className="p-5">
          <Text className="font-circularBold text-2xl mb-2">Your Invoice</Text>
          <View className="flex-row justify-between mb-6">
            <Text className="font-circularMedium text-base text-[#98A1B3]">{invoice.invoiceNumber} is ready!</Text>
            <HookStatusBadge status={invoice.hookStatus} />
          </View>
          <View className="bg-[#FDECDD] p-4 rounded-lg mb-4">
            <View className="flex-row justify-between pb-4 border-b border-[#B8AEA5] border-dashed">
              <View className="">
                <Text className="font-circularMedium text-sm text-[#98A1B3] mb-2">BILL TO</Text>
                <Text className="font-circularBold mb-2 text-sm text-[#101828]">{invoice.name}</Text>
                <Text className="font-circular mb-2 text-sm text-[#475267]">+444 272820123</Text>
                <Text className="font-circular text-sm text-[#475267]">{invoice.email}</Text>
              </View>
              <View className="items-end">
                <Text className="font-circularMedium text-sm mb-2 text-[#98A1B3]">TOTAL AMOUNT</Text>
                <Text className="font-circularBold mb-2 text-sm text-[#101828]">€{invoice.amount}</Text>
                <Text className="font-circularMedium mb-2 text-sm text-[#98A1B3]">AMOUNT DUE</Text>
                <Text className="font-circularBold text-sm text-[#101828]">€{invoice.amountDue}</Text>
              </View>
            </View>
            <View className="flex-row justify-between mt-4">
              <View>
                <Text className="font-circularMedium mb-2 text-sm text-[#98A1B3]">ISSUED DATE</Text>
                <Text className="font-circularMedium text-sm text-[#101828]">09/09/2024</Text>
              </View>
              <View>
                <Text className="font-circularMedium mb-2 text-sm text-[#98A1B3]">DUE DATE</Text>
                <Text className="font-circularMedium text-sm text-[#101828]">09/10/2024</Text>
              </View>
              <View>
                <Text className="font-circularMedium mb-2 text-sm text-[#98A1B3]">INVOICE TYPE</Text>
                <Text className="font-circularMedium text-sm text-[#101828]">Deposit</Text>
              </View>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View className="mb-4">
              <Text className="font-circularBold mb-2 text-sm">Description</Text>
              <Text className="font-circular max-w-[200px] text-sm text-[#475267]">Prepare and file accounts for the year ended 08/09/2024</Text>
            </View>
            <View className="mb-4">
              <Text className="font-circularBold mb-2 text-sm">Qty</Text>
              <Text className="font-circular text-sm text-[#475267]">1</Text>
            </View>
            <View className="mb-4">
              <Text className="font-circularBold mb-2 text-sm text-right">Amount</Text>
              <Text className="font-circular text-sm text-right text-[#475267]">€{invoice.amount} {"\n"}(VAT incl.)</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-[#FFFFFF] p-4 rounded-lg mb-4 space-y-3">
            <Text className="font-circular text-sm">Invoice for {invoice.name}.PDF</Text>
            <View className="flex-row items-center">
              <DocumentUpload size="24" color="#37A19A" variant="Bold"/>
              <Text className="font-circular text-[#101828] text-sm ml-2">PDF</Text>
            </View>
            <View>
              <Text className="font-circularMedium text-[#37A19A] text-base">Download</Text>
            </View>
          </TouchableOpacity>
          <View className="flex-row items-start bg-[#FFFFFF] p-4 rounded-lg mb-4">
            <InfoCircle color='#37A19A' size={24} variant='Bulk'/>
            <Text className="font-circular text-[#475267] ml-3 text-sm">This invoice is a 50% deposit and the balance will be completed when draft is completed before filling</Text>
          </View>
        </View>
      </ScrollView>
      <View className="p-5">
        <TouchableOpacity className="bg-[#37A19A] p-4 rounded-lg">
          <Text className="font-circularBold text-white text-center text-sm">Pay now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InvoiceDetails;