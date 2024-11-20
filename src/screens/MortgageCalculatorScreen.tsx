import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export const MortgageCalculatorScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
        TODO: Mortgage Calculator
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
