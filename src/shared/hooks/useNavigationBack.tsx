import { useNavigation } from "expo-router";
import { useCallback } from "react";

/**
 * Helper for navigating back on a Screen
 */
export const useNavigationBack = () => {
  const navigation = useNavigation();
  return useCallback(() => {
    // when deep linking to a page, there may not be a page to return to, so
    // just go to the homepage / dashboard when that happens
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({ index: 0, routes: [{ name: "(tabs)" as never }] });
    }
  }, [navigation]);
};
