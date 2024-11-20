import { Dimensions } from "react-native";

export const useIsMobileWidth = () => {
  const width = Dimensions.get("window").width;
  return width < 768;
};
