import React, { useEffect } from "react";
import { View } from "react-native";
import Svg, { Circle, Text } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgressBar = ({ progress }: { progress: number }) => {
  const circumference = 2 * Math.PI * 45;
  const progressValue = useSharedValue(0);

  useEffect(() => {
    progressValue.value = withTiming(progress, { duration: 1000 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference - (progressValue.value / 100) * circumference;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View>
      <Svg width="100" height="100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="10"
        />
        <AnimatedCircle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#4caf50"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          rotation="-90"
          origin="50, 50"
        />
        <Text
          x="50"
          y="50"
          fontSize="20"
          fill="#000"
          textAnchor="middle"
          alignmentBaseline="central"
        >
          {`${Math.round(progress)}%`}
        </Text>
      </Svg>
    </View>
  );
};
