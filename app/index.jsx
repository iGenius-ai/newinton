import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '../constants';

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home'); // Navigate to the home screen
    }, 2000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container} className="bg-[#37A19A] relative">
      <Image source={images.logo} />
      <Image source={images.pattern} className="absolute inset-0" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'CircularStd-Bold', // Use one of your custom fonts
  },
});

export default SplashScreen;