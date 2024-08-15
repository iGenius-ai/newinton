import { DocumentUpload } from 'iconsax-react-native';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

const InvoiceDetailsView = ({ invoice, isPreview }) => {
  return (
    <ScrollView className="flex-1 p-4 bg-[#F7F7F7]">
      <View className="bg-[#FDECDD] p-4 rounded-lg mb-4">
        <View className="flex-row justify-between pb-4 border-b border-[#B8AEA5] border-dashed">
          <View className="">
            <Text className="font-circularMedium text-sm text-[#98A1B3] mb-2">BILL TO</Text>
            <Text className="font-circularBold mb-2 text-sm text-[#101828]">{invoice.raisedBy}</Text>
            <Text className="font-circular mb-2 text-sm text-[#475267]">+444 272820123</Text>
            <Text className="font-circular text-sm text-[#475267]">{invoice.email}</Text>
          </View>
          <View className="items-end">
            <Text className="font-circularMedium text-sm mb-2 text-[#98A1B3]">TOTAL AMOUNT</Text>
            <Text className="font-circularBold mb-2 text-sm text-[#101828]">€ {invoice.totalAmount}</Text>
            <Text className="font-circularMedium mb-2 text-sm text-[#98A1B3]">AMOUNT DUE</Text>
            <Text className="font-circularBold text-sm text-[#101828]">€ {invoice.amountDue}</Text>
          </View>
        </View>
        <View className="flex-row justify-between mt-4">
          <View>
            <Text className="font-circularMedium mb-2 text-sm text-[#98A1B3]">ISSUED DATE</Text>
            <Text className="font-circularMedium text-sm text-[#101828]">{invoice.issuedDate.toLocaleDateString()}</Text>
          </View>
          <View>
            <Text className="font-circularMedium mb-2 text-sm text-[#98A1B3]">DUE DATE</Text>
            <Text className="font-circularMedium text-sm text-[#101828]">{invoice.dueDate.toLocaleDateString()}</Text>
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
          <Text className="font-circular text-sm text-right text-[#475267]">€ {invoice.totalAmount} {"\n"}(VAT incl.)</Text>
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
    </ScrollView>
  );
};

export default InvoiceDetailsView;