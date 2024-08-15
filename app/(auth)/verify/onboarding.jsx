import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Briefcase, SmsNotification } from 'iconsax-react-native'
import icons from '../../../constants/icons'
import { Link } from 'expo-router'

const Onboarding = () => {
  
  return (
    <SafeAreaView className="bg-white flex-1 h-full">
      <View className="-mt-10 p-5 flex-1 justify-between">
        <View className="gap-y-8">
          <View>
            <Text className="font-circularBold mb-1 text-3xl">Welcome to</Text>
            <Text className="font-circularBold mb-2 text-3xl">Newinton Accountancy</Text>
            <Text className="text-lg font-circular text-gray-400 mt-2">
              We are glad to have you here. Below are the few steps you will go through in order to 
              access our full accounting services.
            </Text>
          </View>

          <View>
            <View className="flex-row items-center gap-x-2 mb-8">
              <View className="p-2 rounded-full bg-[#f3f4f6]">
                <Briefcase size="32" color="#37a19a" variant="Bulk"/>
              </View>
              <Text className="font-circular text-lg text-gray-600">First, we will need to know about you and {"\n"}your interests</Text>
            </View>
            <View className="flex-row items-center gap-x-2 mb-8">
              <View className="p-2 rounded-full bg-[#f3f4f6]">
                <SmsNotification size="32" color="#37a19a" variant="Bulk"/>
              </View>
              <Text className="font-circular text-lg text-gray-600">Then, we will send you a confirmation mail {"\n"}and a link for us to schedule a call</Text>
            </View>
            <View className="flex-row items-center gap-x-2">
              <View className="p-2 rounded-full bg-[#f3f4f6]">
                <Image source={icons.confetti} className="w-8 h-8" />
              </View>
              <Text className="font-circular text-lg text-gray-600">After an onboarding call, we will confirm you {"\n"}as a client and grant you full access to our {"\n"}mobile app!</Text>
            </View>
          </View>
        </View>

        <Link href={"/verify/create_profile"} className="text-center bg-[#4EB1B3] p-4 mb-4 rounded-full" asChild>
          <Text className="font-circular text-white text-lg">Okay, Get started</Text>
        </Link>     
      </View>
    </SafeAreaView>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#D0D5DD",
    width: 75,
    height: 75,
    fontFamily: "CircularStd-Bold",
    fontSize: 60,
    padding: 10
  },
});