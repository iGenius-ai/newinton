import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { DocumentText, Add, ArrowRight2, DocumentUpload } from 'iconsax-react-native';
import InvoicesCard from '../../../components/screen/InvoicesCard';
import { Link } from 'expo-router';
import invoiceData from '../../../lib/invoiceData';

const InvoiceItem = ({ invoice }) => (
  <Link href={`/(tabs)/invoices/${invoice.id}`} asChild>
    <TouchableOpacity className="flex-row justify-between items-center py-4 mx-4 border-b border-[#EAECF0]">
      <View>
        <Text className="font-circularBold text-base mb-2">{invoice.name}</Text>
        <Text className="font-circular text-sm text-[#667085] mb-2">{invoice.date} · {invoice.invoiceNumber}</Text>
        <View className="flex-row items-center mt-1">
          <Text className={`font-circular text-xs p-2 py-1 rounded-lg ${invoice.status === 'Received' ? 'text-[#F79009] bg-[#FEF2E7]' : 'text-[#37A19A] bg-[#e7fef0]'} mr-2`}>{invoice.status}</Text>
          <View className="flex-row items-center border border-[#EAECF0] px-2 py-1 rounded-full">
            <DocumentUpload size="16" color="#37A19A" variant="Bold"/>
            <Text className="font-circular text-xs text-[#667085] ml-2">Invoice for Mr Em...</Text>
          </View>
        </View>
      </View>
      <View className="items-end">
        <Text className="font-circularBold text-base mb-1">€{invoice.amount}</Text>
        <ArrowRight2 size="20" color="#667085" />
      </View>
    </TouchableOpacity>
  </Link>
);

const Invoices = () => {

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F7]">
      <InvoicesCard />
      <View className="mx-5 rounded-2xl h-[550px] bg-white">
        <FlatList
          data={invoiceData} showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <InvoiceItem 
              invoice={item} 
              onPress={() => setSelectedInvoice(item)} 
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View className="items-center justify-center rounded-2xl bg-white p-5 h-[550px] py-8 pt-2">
              <View className="bg-[#F5F5F5] p-6 rounded-full mb-4">
                <DocumentText size="48" color="#667085" variant="Bulk"/>
              </View>
              <Text className="font-circularBold text-xl text-[#101828]">No invoices yet</Text>
              <Text className="font-circular text-base text-[#667085] text-center p-2">
                You haven't created or received an invoice yet.{"\n"}When you do, they will appear here.
              </Text>
            </View>
          }
        />
      </View>
      
      <Link href={"/(tabs)/invoices/create"}
        className="absolute bottom-6 right-6 bg-[#37A19A] p-4 rounded-full shadow-lg"
      >
        <Add size={22} color={"#FFFFFF"} />
      </Link>
    </SafeAreaView>
  );
};

export default Invoices;