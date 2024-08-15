import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { transactions } from '../../../lib/transactions';
import { Link, useNavigation } from 'expo-router';

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

const Transactions = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} />}
        keyExtractor={item => item.id.toString()}
        style={{ padding: 16, paddingTop: 4, margin: 20, marginTop: 24, borderRadius: 16, backgroundColor: 'white' }}
      />
    </SafeAreaView>
  );
};

export default Transactions;