import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowRight2, ReceiptItem } from 'iconsax-react-native';
import ProfileCard from '../../../components/screen/ProfileCard';
import { transactions } from '../../../lib/transactions';
import { Link, useNavigation } from 'expo-router';
import AnimatedProgressCircle from '../../../components/screen/AnimatedProgressCircle';

const TransactionItem = ({ item }) => {
  const navigation = useNavigation(); // Hook to access navigation

  const handlePress = () => {
    navigation.navigate('trxdetail/[details]', { details: item.id }); // Navigate to the details screen with the ID
  };

  return (
    <TouchableOpacity onPress={handlePress} className="flex-row justify-between items-center py-4 border-b border-gray-100">
      <View>
        <Text className="font-circularMedium mb-1 text-base text-[#101828]">{item.name}</Text>
        <Text className="font-circular text-sm text-[#667085]">{item.time}, {item.date}</Text>
      </View>
      <Text className="font-circularMedium text-base text-[#101828]"> - € {item.amount}</Text>
    </TouchableOpacity>
  );
};

const Dashboard = () => {
  const navigation = useNavigation(); // Hook to access navigation

  const startKYC = () => {
    navigation.navigate("kyc/kycForm"); // Navigate to the details screen with the ID
  };

  const hasTransactions = transactions.length > 0;
  const displayedTransactions = transactions.slice(0, 4); // Only display up to 4 transactions

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F7]">
      <ProfileCard />
      <ScrollView className="flex-1 p-5">
        <View className="rounded-2xl bg-white p-5 py-8">
          <View className="items-center mb-8">
            <View className="w-56 h-56 rounded-full border-pink-50 border-[20px] items-center justify-center">
              <AnimatedProgressCircle size={224} strokeWidth={20} targetPercentage={30} />
            </View>
          </View>
          <View>
            <Text className="font-circularBold text-base text-[#101828]">Welcome to Newinton</Text>
            <Text className="font-circular text-[#667085] text-base">
              You will need to fill and submit some required KYC details that will aid us serve you better.
            </Text>
            <TouchableOpacity onPress={startKYC} className="items-center bg-[#4EB1B3] p-4 mt-6 rounded-full" activeOpacity={0.7}>
              <Text className="font-circularMedium text-white text-lg">Start KYC registration</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-4">
          <View className="flex-row justify-between px-4 py-3 rounded-t-2xl items-center bg-[#F0F2F5]">
            <Text className="font-circularMedium text-lg text-[#101828]">Transactions</Text>
            <Link href={"/(tabs)/dashboard/transactions"}>
              <View className="flex-row items-center">
                <Text className="font-circularMedium text-base text-[#667085] mr-1">View all</Text>
                <ArrowRight2 size={16} color="#667085" />
              </View>
            </Link>
          </View>
          <View className="bg-white rounded-b-2xl p-4">
            {hasTransactions ? (
              displayedTransactions.map((item) => (
                <TransactionItem key={item.id} item={item} />
              ))
            ) : (
              <View className="items-center justify-center min-h-[400px]">
                <View className="bg-[#F5F5F5] p-6 rounded-full mb-4">
                  <ReceiptItem size="48" color="#667085" variant="Bulk"/>
                </View>
                <Text className="font-circularBold text-xl text-[#101828]">No transaction yet</Text>
                <Text className="font-circular text-base text-[#667085] text-center p-2">
                  You haven't made a payment yet when you do,{"\n"}they will appear here.
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={{ paddingBottom: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;