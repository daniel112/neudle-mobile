import { Surface, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { FC } from "react";

interface InterestRatePreviewProps {
  state?: string;
}

/**
 * Displays average interest rate for the given state
 */
export const InterestRatePreview: FC<InterestRatePreviewProps> = ({
  state = "AZ",
}) => {
  return (
    <Surface style={styles.infoSurface} elevation={2}>
      <Text>TODO: fetch interest rate for state</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  infoSurface: { marginVertical: 16, height: 200 },
});
