import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Svg, { Circle, Text } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularTimerProps {
  /**
   * value in seconds. websocket will send this value every second
   */
  value: number;
  startValue: number;
}

export const CircularTimer = ({ value, startValue }: CircularTimerProps) => {
  const circumference = 2 * Math.PI * 45;
  const progressValue = useSharedValue(value);

  useEffect(() => {
    progressValue.value = withTiming(value, { duration: 1000 });
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference + (value / startValue) * circumference;
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
          {value}
        </Text>
      </Svg>
    </View>
  );
};
