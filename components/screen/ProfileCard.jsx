import { NotificationBing } from 'iconsax-react-native'
import React from 'react'
import { Text, View } from 'react-native'

const ProfileCard = () => {
  return (
    <View className="mt-10 p-5 flex-row items-center justify-between">
      <View>
        <Text className="text-2xl font-circularBold">Hello Leonard,</Text>
        <Text className="text-base font-circular text-[#667085]">Good evening 👋</Text>
      </View>
      <View className="bg-[#FFFFFF] p-3 rounded-full relative">
        <NotificationBing size="24" color="#667085" variant="Outline"/>
        <View className="w-[11px] h-[11px] bg-[#EB5757] rounded-full absolute right-[11px] top-[9px] border-[2px] border-white"></View>
      </View>
    </View>
  )
}

export default ProfileCard