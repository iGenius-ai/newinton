import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { transactions } from '../../../../lib/transactions';
import { useLocalSearchParams } from 'expo-router';

const Details = () => {
  const { details } = useLocalSearchParams();
  const TRXDetails = transactions.find(detail => detail.id === details);  

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F7]">
      <View className="m-5 my-10">
        <View className="flex-row items-center justify-between">
          <Text className="font-circular text-base text-[#667085] mb-2">Amount: </Text>
          <Text className="font-circularMedium text-base text-[#101828] mb-2">-€{TRXDetails.amount}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-circular text-base text-[#667085] mb-2">Status: </Text>
          <Text className="font-circularMedium text-base text-[#101828] mb-2">{TRXDetails.status}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-circular text-base text-[#667085] mb-2">Time: </Text>
          <Text className="font-circularMedium text-base text-[#101828] mb-2">{TRXDetails.time}, {TRXDetails.date}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-circular text-base text-[#667085] mb-2">Type: </Text>
          <Text className="font-circularMedium text-base text-[#101828] mb-2">{TRXDetails.type}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-circular text-base text-[#667085] mb-2">Trade No.: </Text>
          <Text className="font-circularMedium text-base text-[#101828] mb-2">{TRXDetails.tradeNo}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-circular text-base text-[#667085] mb-2">TRXDetails No.: </Text>
          <Text className="font-circularMedium text-base text-[#101828] mb-2">{TRXDetails.transactionNo}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Details