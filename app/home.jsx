import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Image } from 'react-native';
import { images } from '../constants';

const Welcome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { width: windowWidth } = useWindowDimensions();

  const screens = [
    {
      title: "Accounting with No hassle",
      subtitle: "Enjoy seamless accounting services from Newinton Accountancy, accessible anywhere, without stress or hassle.",
      backgroundColor: '#e0e0ff',
      src: images.person1
    },
    {
      title: "One-one consultation",
      subtitle: "Receive tailored advice from our expert accountants. Get the support you need, anytime, anywhere.",
      backgroundColor: '#e0e0ff',
      src: images.person2
    },
    {
      title: "Generate invoices easily",
      subtitle: "Create professional invoices quickly with intuitive tools that save you time, so you can focus on growing your business.",
      backgroundColor: '#e0e0ff',
      src: images.person3
    },
  ];

  const renderItem = ({ item, index }) => (
    <View style={[styles.screen, { width: windowWidth }]}>
      <Text className="font-circularBold text-2xl" style={styles.title}>{item.title}</Text>
      <Text className="font-circular px-2 text-lg mb-5" style={styles.subtitle}>{item.subtitle}</Text>
      <View className="rounded-3xl overflow-hidden flex items-center justify-center" style={[styles.placeholder, { backgroundColor: item.backgroundColor }]} >
        <Image source={item.src} className="w-[110%]" />
      </View>
    </View>
  );

  const Indicator = () => (
    <View className="flex-row justify-center mt-5">
      {screens.map((_, index) => (
        <View
          key={index}
          className="rounded-full mx-1"
          style={[
            styles.indicator,
            index === currentIndex ? styles.activeIndicator : null,
          ]}
        />
      ))}
    </View>
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / windowWidth);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView className="flex-1">
      <View style={styles.container}>
        <Indicator />
        <FlatList
          ref={flatListRef}
          data={screens}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        <Link href={"/(auth)/sign-in"} className="bg-[#4EB1B3] text-center p-4 mx-5 my-3 rounded-full">
          <Text className="font-circularBold text-white text-lg">Log in</Text>
        </Link>
        <Text className="mb-5 font-circular text-lg text-center text-gray-400">
          Don't have an account? <Link href={"/(auth)/sign-up"} className="text-gray-900">Create now</Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
  },
  placeholder: {
    width: '100%',
    height: '80%',
  },
  indicator: {
    height: 4,
    width: '20%',
    backgroundColor: '#ccc',
  },
  activeIndicator: {
    backgroundColor: '#4EB1B3',
  },
  createAccountLink: {
    color: '#4EB1B3',
    fontWeight: 'bold',
  },
});

export default Welcome;