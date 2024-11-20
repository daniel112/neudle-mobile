import { Image, StyleSheet, Button, View } from "react-native";

import ParallaxScrollView from "@/shared/components/ParallaxScrollView";
import { useRouter } from "expo-router";
import { Text } from "react-native-paper";

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
      <View style={styles.titleContainer}>
        <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
          Trivia
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text variant="bodyLarge">Join room to play live trivia</Text>
        <Button
          title="Connect to Room 1"
          onPress={() => {
            router.push({
              pathname: "/waitingRooms/[room]",
              params: { room: "1" },
            });
          }}
        />
      </View>
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
