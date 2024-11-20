import { StyleSheet, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { socket } from "@/features/trivia/socket";
import { useIsMobileWidth } from "@/shared/hooks/useIsMobileWidth";
import { CircularTimer } from "@/shared/components/CircularTimer";
import {
  GameState,
  useCurrentGameState,
} from "@/features/trivia/hooks/useCurrentGameState";
import { setGameState } from "@/features/trivia/data/setGameState";
import { user } from "@/screens/trivia/TriviaWaitingRoomScreen";

socket.on("connect", () => {
  console.log("connected");
});

socket.on("disconnect", () => {
  console.log("disconnect");
});

export const TriviaRoomScreen = () => {
  const { room } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const { question, startTimerValue, timerValue, fetchNewQuestion } =
    useCurrentGameState({
      room: room as string,
      onGameEnd: async (gameState: GameState) => {
        // store game state in local storage
        const success = await setGameState(gameState, room as string);
        console.log({ success });
        success &&
          router.replace({
            pathname: "/gameRoom/Results",
            params: { room },
          });
      },
    });

  const isMobileWidth = useIsMobileWidth();
  const styles = getDynamicStyles(isMobileWidth);

  useEffect(() => {
    if (timerValue === 0 && question) {
      const answer = {
        room,
        userId: user,
        answer: selectedAnswer,
        questionId: question.id,
      };
      socket.emit("submitAnswer", answer);
      // show loading state
      setIsLoading(true);
      // wait 2 seconds and then reset the question
      setTimeout(() => {
        setIsLoading(false);
        setSelectedAnswer(null);
        fetchNewQuestion();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerValue]);

  const handleAnswerSelect = (key: string) => {
    setSelectedAnswer(key);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.progressContainer}>
        <CircularTimer startValue={startTimerValue} value={timerValue} />
      </View>

      <Card style={styles.questionCard}>
        <Card.Content>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text variant="titleLarge" style={styles.questionText}>
              {question?.question}
            </Text>
          )}
        </Card.Content>
      </Card>
      <View style={styles.optionsContainer}>
        {question?.options &&
          Object.entries(question.options).map(([key, value]) => (
            <Button
              disabled={isLoading}
              key={key}
              mode={selectedAnswer === key ? "contained" : "outlined"}
              onPress={() => handleAnswerSelect(key)}
              style={styles.optionButton}
              labelStyle={styles.optionText}
            >
              {value}
            </Button>
          ))}
      </View>
    </ScrollView>
  );
};

const getDynamicStyles = (isMobileWidth: boolean) => {
  return StyleSheet.create({
    progressContainer: {
      marginBottom: 20,
      // backgroundColor: "red",
      alignItems: "flex-end",
    },
    contentContainer: {
      flexGrow: 1,
      padding: 16,
      alignSelf: "center",
      justifyContent: "center",
      width: isMobileWidth ? "100%" : "70%",
    },
    questionCard: {
      marginBottom: 20,
      height: 200,
      justifyContent: "center",
    },
    questionText: {
      textAlign: "center",
    },
    optionsContainer: {
      marginTop: 10,
    },
    optionButton: {
      marginBottom: 10,
    },
    optionText: {
      fontSize: 16,
    },
  });
};
