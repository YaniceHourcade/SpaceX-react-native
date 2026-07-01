import { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { askHuggingFace, ChatMessage } from "../services/huggingFaceAI";

const userIcon = require("../../assets/images/user.png");
const chatbotIcon = require("../../assets/images/chatbot.png");
const arrowIcon = require("../../assets/images/ArrowLeft.png");

export default function ChatAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  async function send() {
    if (!input.trim() || loading) return;
    Keyboard.dismiss();
    const userMessage: ChatMessage = {
      role: "user",
      content: input,
    };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setLoading(true);
    try {
      const answer = await askHuggingFace(history);
      setMessages([
        ...history,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (e) {
      console.log("HF ERROR:", e);
    }
    setLoading(false);
    requestAnimationFrame(() =>
      scrollRef.current?.scrollToEnd({ animated: true }),
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image
            source={arrowIcon}
            style={styles.arrowIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chatbot</Text>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.chat}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            return (
              <View
                key={i}
                style={[
                  styles.messageRow,
                  isUser ? styles.messageRowUser : styles.messageRowBot,
                ]}
              >
                {!isUser && (
                  <Image
                    source={chatbotIcon}
                    style={styles.avatar}
                    resizeMode="contain"
                  />
                )}
                <Text
                  style={[
                    styles.messageText,
                    isUser ? styles.messageTextUser : styles.messageTextBot,
                  ]}
                >
                  {m.content}
                </Text>
                {isUser && (
                  <Image
                    source={userIcon}
                    style={styles.avatar}
                    resizeMode="contain"
                  />
                )}
              </View>
            );
          })}

          {loading && (
            <View style={[styles.messageRow, styles.messageRowBot]}>
              <Image
                source={chatbotIcon}
                style={styles.avatar}
                resizeMode="contain"
              />
              <Text style={[styles.messageText, styles.messageTextBot]}>
                ...
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Search a date or launch name"
              placeholderTextColor="#AAAAAA"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={send}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={send}
              disabled={!input.trim() || loading}
            >
              <Text
                style={[
                  styles.sendButtonText,
                  (!input.trim() || loading) && styles.sendButtonTextDisabled,
                ]}
              >
                Envoyer
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputUnderline} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 32,
    justifyContent: "center",
  },
  arrowIcon: {
    width: 22,
    height: 22,
  },
  headerTitle: {
    color: "#ffffff",
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 17,
  },
  chat: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 20,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    maxWidth: "100%",
  },
  messageRowBot: {
    justifyContent: "flex-start",
  },
  messageRowUser: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginTop: 2,
  },
  messageText: {
    flexShrink: 1,
    fontFamily: "RobotoCondensed_400Regular",
    fontSize: 15,
    lineHeight: 21,
    maxWidth: "78%",
  },
  messageTextBot: {
    color: "#ffffff",
    marginLeft: 10,
    textAlign: "left",
  },
  messageTextUser: {
    color: "#ffffff",
    marginRight: 10,
    textAlign: "right",
  },
  inputWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontFamily: "RobotoCondensed_400Regular",
    fontSize: 15,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  sendButtonText: {
    color: "#3b82f6",
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 14,
  },
  sendButtonTextDisabled: {
    color: "#555555",
  },
  inputUnderline: {
    height: 1,
    backgroundColor: "#333333",
  },
});
