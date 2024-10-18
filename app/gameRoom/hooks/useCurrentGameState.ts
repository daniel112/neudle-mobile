import { socket } from "@/app/gameRoom/socket";
import type { Question } from "@/app/gameRoom/types";
import { useEffect, useState, useCallback } from "react";

interface Player {
  id: string;
  name: string;
}

interface SubmittedAnswers {
  [questionId: string]: {
    [playerId: string]: string;
  };
}

export interface GameState {
  roomId: string;
  players: Player[];
  questionBank: Question[];
  /**
   * @description A map of player ids to their submitted answers
   * {questionId: {playerId: answer}}
   */
  submittedAnswers: SubmittedAnswers;
}

interface CurrentQuestionReturnValues {
  question?: Question;
  startTimerValue: number;
  timerValue: number;
  fetchNewQuestion: () => void;
}

export const useCurrentGameState = ({
  room,
  onGameEnd,
}: {
  room: string;
  onGameEnd: (gameState: GameState) => void;
}): CurrentQuestionReturnValues => {
  const [question, setQuestion] = useState<Question>();
  const [startTimerValue, setStartTimerValue] = useState(0);
  const [timerValue, setTimerValue] = useState(0);

  const fetchNewQuestion = useCallback(() => {
    socket.emit("getQuestion", room, (question: Question, timer: number) => {
      setQuestion(question);
      setStartTimerValue(timer);
      setTimerValue(timer);
    });
  }, [room]);

  useEffect(() => {
    fetchNewQuestion();

    socket.on("gameEnded", (gameState: GameState) => {
      onGameEnd(gameState);
    });

    socket.on("timesUp", () => {
      setTimerValue(0);
    });

    return () => {
      socket.off("timesUp");
      socket.off("gameEnded");
    };
  }, [room, fetchNewQuestion]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timerValue > 0) {
        setTimerValue((prev) => prev - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerValue]);

  return { question, startTimerValue, timerValue, fetchNewQuestion };
};
