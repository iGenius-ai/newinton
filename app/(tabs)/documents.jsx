import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { ArrowRight2, Edit, FolderOpen, NotificationBing, ReceiptItem } from 'iconsax-react-native';
import DocumentCard from '../../components/screen/DocumentCard';

const Documents = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F7]">
      {/* Header */}
      <DocumentCard />
      <View className="flex-1 p-5">
        <View className="rounded-2xl bg-white p-5 h-[500px] py-8 pt-2">
          <TouchableOpacity activeOpacity={0.6} className="flex-row py-3 border-b border-[#E3E7ED] items-center justify-between">
            <View className="bg-[#EDF9F8] p-2 rounded-full mr-4">
              <FolderOpen color="#37A19A" size={24} variant='Bulk' />
            </View>
            <View className="flex-1">
              <Text className="font-circularMedium text-[#101828] text-base">My Documents</Text>
            </View>
            <View>
              <ArrowRight2 color="#98A1B3" size={16} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} className="flex-row py-3 items-center justify-between">
            <View className="bg-[#EDF9F8] p-2 rounded-full mr-4">
              <Edit color="#37A19A" size={24} variant='Bulk' />
            </View>
            <View className="flex-1">
              <Text className="font-circularMedium text-[#101828] text-base">Custom Forms</Text>
            </View>
            <View>
              <ArrowRight2 color="#98A1B3" size={16} />
            </View>
          </TouchableOpacity>
        </View>
        {/* Add padding to the bottom */}
        <View style={{ paddingBottom: 50 }} />
      </View>
    </SafeAreaView>
  );
};

export default Documents;