import { GameState } from "@/app/gameRoom/hooks/useCurrentGameState";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setGameState = async (
  gameState: GameState,
  room: string,
): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(gameState);
    await AsyncStorage.setItem(`gameState-${room}`, jsonValue);
    return true;
  } catch (e) {
    // saving error
    console.error("saving error", e);
    return false;
  }
};
