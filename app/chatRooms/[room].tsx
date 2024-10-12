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

interface RoomMessage {
  room: string;
  message: Message;
}
interface Message {
  id: string;
  text: string;
  from: string;
}

const randomGuid = Math.random().toString();

export default function ChatRoom() {
  const { room } = useLocalSearchParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const onMessage = (msg: any) => {
      if (msg.room === room && msg.message.from !== `user-${randomGuid}`) {
        setMessages((prevMessages) => [...prevMessages, msg.message]);
      }
    };

    socket.on("newMessage", onMessage);
    return () => {
      socket.off("newMessage", onMessage);
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return; // Avoid empty messages

    const newMessage = {
      id: Math.random().toString(),
      text: inputMessage,
      from: `user-${randomGuid}`,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage(""); // Clear the input

    // Emit the message to the server
    socket.emit(
      "message",
      { room, message: newMessage },
      (messages: Message[]) => {
        console.log({ messages });
      }
    );
  };
  return (
    <View style={styles.container}>
      {/* Message List */}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />

      {/* Chatbox */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.chatBoxContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={inputMessage}
            onChangeText={setInputMessage}
            onSubmitEditing={sendMessage} // Sends message when pressing enter on keyboard
          />
          <TouchableOpacity onPress={sendMessage}>
            <IconButton icon="send" size={24} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageList: {
    padding: 10,
    paddingBottom: 80, // Add padding for the chatbox
  },
  messageContainer: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignSelf: "flex-start", // For example, to align messages to the left
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  chatBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: "#fff",
  },
});
