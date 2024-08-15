import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default AnimatedProgressCircle = ({ size = 224, strokeWidth = 20, targetPercentage }) => {
  const [count, setCount] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    setCount(0);

    const animation = Animated.timing(animatedValue, {
      toValue: targetPercentage,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [targetPercentage]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count < targetPercentage) {
        setCount(count + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 5); // Adjust the interval time as needed

    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-270deg' }] }}>
        <Circle
          stroke="#FCEDF2"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          ref={circleRef}
          stroke="#4EB1B3"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View className="absolute items-center">
        <Text className="font-circular uppercase text-[#91979E] mb-1">
          Account Progress
        </Text>
        <Animated.Text className="font-circularMedium text-4xl text-[#101828] mb-1">
          {count}%
        </Animated.Text>
        <View className="px-2 py-1 rounded-lg bg-[#E2FCF2]">
          <Text className="font-circular text-[#1DC286] text-sm">KYC Stage</Text>
        </View>
      </View>
    </View>
  );
};