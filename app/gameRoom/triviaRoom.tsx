import { StyleSheet, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Button, Card, Text } from "react-native-paper";
import { socket } from "../(tabs)";
import { useIsMobileWidth } from "@/hooks/useIsMobileWidth";
import { CircularTimer } from "@/components/CircularTimer";

socket.on("connect", () => {
  console.log("connected");
});

socket.on("disconnect", () => {
  console.log("disconnect");
});

interface Question {
  question: string;
  /**
   * The options to choose from
   * {a: "Option A", b: "Option B", c: "Option C", d: "Option D"}
   */
  options: Record<string, string>;
  /**
   * The correct answer key
   */
  answer: string;
}

export default function TriviaRoom() {
  const { room } = useLocalSearchParams();
  const [question, setQuestion] = useState<Question>();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  // const theme = useTheme();
  const isMobileWidth = useIsMobileWidth();
  const styles = getDynamicStyles(isMobileWidth);

  useEffect(() => {
    console.log("useEffect");
    socket.emit("getQuestion", room, (question?: Question, error?: string) => {
      if (error) {
        console.log(error);
        return;
      }
      setQuestion(question);
    });

    return () => {};
  }, []);

  const handleAnswerSelect = (key: string) => {
    setSelectedAnswer(key);
    // Here you would typically emit the answer to the server
    // socket.emit("submitAnswer", { room, answer: key });
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.progressContainer}>
        <CircularTimer startValue={10} value={4} />
      </View>

      <Card style={styles.questionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.questionText}>
            {question?.question}
          </Text>
        </Card.Content>
      </Card>
      <View style={styles.optionsContainer}>
        {question?.options &&
          Object.entries(question.options).map(([key, value]) => (
            <Button
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
}

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
