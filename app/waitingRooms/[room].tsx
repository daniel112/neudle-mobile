import { StyleSheet, FlatList, View, ScrollView } from "react-native";
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
import { socket } from "../(tabs)";

socket.on("connect", () => {
  console.log("connected");
});

socket.on("disconnect", () => {
  console.log("disconnect");
});

const randomGuid = Math.random().toString();
const user = `user-${randomGuid}`;

export default function ChatRoom() {
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

    // listen for game start, triggered when the room leader starts the game
    socket.on("gameStarting", () => {
      router.push({
        pathname: "/gameRoom/triviaRoom",
        params: { room },
      });
    });

    // Listen for updates to the user list
    socket.on("userJoined", (users) => {
      setConnectedUsers(users);
      setIsLeader(users[0] === user);
    });

    return () => {
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, []);

  const startGame = () => {
    // Room leader can start the game
    socket.emit("startGame", room, (success: boolean, message?: string) => {
      if (!success) {
        setModalVisible(true);
        setModalMessage(message || "Unknown error");
        return;
      }

      router.push({
        pathname: "/gameRoom/triviaRoom",
        params: { room },
      });
    });
  };
  console.log({ connectedUsers });
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
}

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
