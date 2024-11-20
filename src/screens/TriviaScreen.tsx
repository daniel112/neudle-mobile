import { Image, StyleSheet, Button } from "react-native";

import ParallaxScrollView from "@/shared/components/ParallaxScrollView";
import { ThemedText } from "@/shared/components/ThemedText";
import { ThemedView } from "@/shared/components/ThemedView";
import { useRouter } from "expo-router";

export const TriviaScreen: React.FC = () => {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Trivia</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Join a room</ThemedText>
        <Button
          title="Connect to Room 1"
          onPress={() => {
            router.push({
              pathname: "/waitingRooms/[room]",
              params: { room: "1" },
            });
          }}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});