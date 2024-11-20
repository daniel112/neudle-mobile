import { StyleSheet, FlatList, View } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Button,
  Portal,
  Surface,
  Text,
  Title,
  Dialog,
} from "react-native-paper";
import { socket } from "@/features/trivia/socket";

const randomGuid = Math.random().toString();
export const user = `user-${randomGuid}`;

export const TriviaWaitingRoomScreen: React.FC = () => {
  const { room } = useLocalSearchParams();
  const [connectedUsers, setConnectedUsers] = useState([user]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLeader, setIsLeader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Join the room
    socket.emit("joinRoom", { channel: room, user });

    // listen for userLeft
    socket.on("userLeft", (users) => {
      setConnectedUsers(users);
    });

    // Listen for updates to the user list
    socket.on("userJoined", (users) => {
      setConnectedUsers(users);
      setIsLeader(users[0] === user);
    });

    return () => {
      socket.off("userJoined");
      socket.off("userLeft");
      socket.off("joinRoom");
      socket.emit("leaveRoom", { channel: room });
    };
  }, [room]);
  useEffect(() => {
    // listen for game start, triggered when the room leader starts the game
    const handleGameStarting = () => {
      router.push({
        pathname: "/gameRoom/triviaRoom",
        params: { room },
      });
    };
    socket.off("gameStarting", handleGameStarting);
    socket.on("gameStarting", handleGameStarting);

    return () => {
      socket.off("gameStarting", handleGameStarting);
    };
  }, [room, router]);

  const startGame = () => {
    // Room leader can start the game
    socket.emit("startGame", room, (success: boolean, message?: string) => {
      if (!success) {
        setModalVisible(true);
        setModalMessage(message || "Unknown error");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{modalMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setModalVisible(false)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Surface style={styles.surface}>
        <Title style={styles.title}>Waiting Room: {room}</Title>
        <FlatList
          data={connectedUsers}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            return (
              <View style={styles.userItem}>
                <Text>{item}</Text>
                <Text>{item === user ? "(You)" : ""}</Text>
              </View>
            );
          }}
          style={styles.userList}
        />
        <Button
          mode="contained"
          disabled={!isLeader}
          onPress={startGame}
          style={styles.startButton}
        >
          {isLeader ? "Start Game" : "Waiting for host to start game"}
        </Button>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  surface: {
    padding: 16,
    elevation: 4,
    height: "50%",
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  userList: {
    flex: 1,
  },
  startButton: {
    marginTop: 16,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});
