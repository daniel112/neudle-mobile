import { useNavigationBack } from "@/shared/hooks/useNavigationBack";
import React, { FC } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import type { HeaderBackButtonProps } from "@react-navigation/elements";

interface CircleBackButtonProps extends HeaderBackButtonProps {
  onPress?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
}
/**
 * Left arrow icon framed in circle
 */
export const CircleBackButton: FC<CircleBackButtonProps> = ({
  onPress,
  size = 30,
  style,
}) => {
  const theme = useTheme();
  const defaultOnPress = useNavigationBack();
  return (
    <IconButton
      onPress={onPress || defaultOnPress}
      icon="arrow-left-thick"
      iconColor={theme.colors.primary}
      containerColor={theme.colors.onPrimaryContainer}
      size={size}
      style={[styles.defaultBackButton, style]}
    />
  );
};

const styles = StyleSheet.create({
  defaultBackButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
});
