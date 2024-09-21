import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Assuming you're using Expo
import { ArrowRight2, Edit, FolderOpen, Key, LogoutCurve, NotificationBing, ReceiptItem, User } from 'iconsax-react-native';
import MoreCard from '../../components/screen/MoreCard';
import { signOut } from '../../lib/newinton';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const onLogoutPress = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: async () => {
            await signOut();
            setUser(null);
            setIsLogged(false);
            router.replace('/sign-in');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F7]">
      {/* Header */}
      <MoreCard />
      <View className="flex-1 p-5 py-1">
        <View className="rounded-2xl bg-white p-5 pt-2">
          <TouchableOpacity activeOpacity={0.6} className="flex-row py-3 border-b border-[#E3E7ED] items-center justify-between">
            <View className="bg-[#EDF9F8] p-2 rounded-full mr-4">
              <User color="#37A19A" size={23} variant='Bulk' />
            </View>
            <View className="flex-1">
              <Text className="font-circularMedium text-[#101828] text-base">Your Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} className="flex-row py-3 border-b border-[#E3E7ED] items-center justify-between">
            <View className="bg-[#EDF9F8] p-2 rounded-full mr-4">
              <User color="#37A19A" size={23} variant='Bulk' />
            </View>
            <View className="flex-1">
              <Text className="font-circularMedium text-[#101828] text-base">KYC Verification</Text>
            </View>
            <View className="bg-[#FEF3F2] py-1 px-2 rounded-lg">
              <Text className="font-circular text-xs text-[#F04438]">Needs Attention</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} className="flex-row py-3 items-center justify-between">
            <View className="bg-[#EDF9F8] p-2 rounded-full mr-4">
              <Key color="#37A19A" size={24} variant='Bulk' />
            </View>
            <View className="flex-1">
              <Text className="font-circularMedium text-[#101828] text-base">Change Password</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-center mt-4">
          <TouchableOpacity className="flex-row items-center" activeOpacity={0.6} onPress={onLogoutPress}>
            <Text className="text-[#F04438] font-circularMedium text-base mr-2">Log Out</Text>
            <View className="bg-[#FEE4E2] p-2 items-center justify-center rounded-full">
              <LogoutCurve color='#F04438' size={18} variant='Outline' />
            </View>
          </TouchableOpacity>
        </View>

        {/* Add padding to the bottom */}
        <View style={{ paddingBottom: 50 }} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;