import { GameState } from "@/app/gameRoom/hooks/useCurrentGameState";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getGameState = async (room: string): Promise<GameState | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(`gameState-${room}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.error("error reading value", e);
    return null;
  }
};
