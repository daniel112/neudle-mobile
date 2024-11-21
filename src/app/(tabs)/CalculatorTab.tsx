import { MortgageCalculatorScreen } from "@/screens/MortgageCalculatorScreen";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// NOTE: A route file is defined by exporting a React component as the default value.

export default function CalculatorTab() {
  return (
    <SafeAreaView
      style={styles.safeAreaContainer}
      edges={["top", "left", "right"]}
    >
      <MortgageCalculatorScreen />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
});
