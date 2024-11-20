import { getGameState } from "@/features/trivia/data/getGameState";
import { GameState } from "@/features/trivia/hooks/useCurrentGameState";
import { Question } from "@/features/trivia/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Card, Text, Title } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface UserAnswer {
  user: string;
  answer: string;
}

interface ResultItem {
  question: Question;
  usersAnswer: UserAnswer[];
}

/**
 * For each question, convert that into a result item, merging with players and submittedAnswers
 */
const convertToResults = (gameState: GameState): ResultItem[] => {
  const results: ResultItem[] = [];
  const players = gameState.players;
  const submittedAnswers = gameState.submittedAnswers;
  gameState.questionBank.map((question) => {
    const item: ResultItem = {
      question,
      usersAnswer: players.map((player) => {
        const letterAnswer = submittedAnswers[question.id][player.name];

        return {
          user: player.name,
          answer: letterAnswer
            ? `${letterAnswer.toUpperCase()}: ${question.options[letterAnswer]}`
            : "No Answer",
        };
      }),
    };
    results.push(item);
  });
  return results;
};

export const TriviaResultScreen = () => {
  const insets = useSafeAreaInsets();
  const { room } = useLocalSearchParams();
  const [results, setResults] = useState<ResultItem[]>([]);
  useEffect(() => {
    const getGameStateData = async () => {
      const data = await getGameState(room as string);
      if (data) {
        setResults(convertToResults(data));
      }
    };
    getGameStateData();
  }, [room]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top,
        gap: 20,
        paddingHorizontal: 10,
      }}
    >
      {results.map((result, index) => {
        return (
          <Card key={index}>
            <Card.Content>
              <Title>{result.question.question}</Title>
              <Text>
                Correct Answer: {result.question.answer.toUpperCase()}.{" "}
                {result.question.options[result.question.answer]}
              </Text>
              <FlatList
                data={result.usersAnswer}
                renderItem={({ item }) => (
                  <Text key={item.user}>
                    {item.user} - {item.answer}
                  </Text>
                )}
              />
            </Card.Content>
          </Card>
        );
      })}
    </SafeAreaView>
  );
};
