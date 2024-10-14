import {
  StyleSheet,
  FlatList,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { IconButton } from "react-native-paper";
import { socket } from "../(tabs)";

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

  return (
    <View style={styles.container}>
      <Text>{question?.question}</Text>
      <Text>{JSON.stringify(question?.options)}</Text>
      <Text>{question?.answer}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
