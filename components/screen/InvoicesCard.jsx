import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NotificationBing, Sort } from 'iconsax-react-native';

const InvoicesCard = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const FilterButton = ({ title }) => (
    <TouchableOpacity
      onPress={() => setActiveFilter(title)}
      className={`px-3 py-2 rounded-full border border-[#EAECF0] mr-2 ${
        activeFilter === title ? 'bg-[#37A19A]' : 'bg-transparent'
      }`}
    >
      <Text
        className={`text-sm font-circular ${
          activeFilter === title ? 'text-white' : 'text-[#101828]'
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="mt-10 p-5">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-circularBold">Invoices</Text>
        </View>
      </View>
      <View className="flex-row mt-4 items-center justify-between">
        <View className="flex-row">
          <FilterButton title="All" />
          <FilterButton title="Received" />
          <FilterButton title="Sent" />
        </View>

        <TouchableOpacity>
          <Sort color='#101828' size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InvoicesCard;