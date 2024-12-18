import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { PaperProvider } from "react-native-paper";
import { CircleBackButton } from "@/shared/components/navigation/CircleBackButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// NOTE: ROOT COMPONENT

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DefaultTheme}>
        <PaperProvider>
          <Stack
            screenOptions={{
              animation: "slide_from_right",
              headerLeft: CircleBackButton,
              headerTransparent: true, // Makes the header fully transparent
              headerTitle: "", // Removes the title
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </PaperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
