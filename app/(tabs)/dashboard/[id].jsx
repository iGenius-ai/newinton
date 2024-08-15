import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { transactions } from '../../../lib/transactions';

const Page = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const TRX = transactions.find(trx => trx.id === id);

  if (!TRX) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-5">
          <Text className="font-circularBold text-2xl mb-2">Transaction not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-5">
        <Text className="font-circularBold text-2xl mb-2">This is the transaction ID for {id}</Text>
      </View>
    </SafeAreaView>
  )
}
export default Page