import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { askHuggingFace, ChatMessage } from "../services/huggingFaceAI";

export default function ChatAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;

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
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chat}>
        {messages.map((m, i) => (
          <Text
            key={i}
            style={{
              marginBottom: 10,
              color: m.role === "user" ? "blue" : "green",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {m.role === "user" ? "You: " : "AI Bot: "}
            </Text>
            {m.content}
          </Text>
        ))}
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Ask a question..."
        value={input}
        onChangeText={setInput}
      />

      <Button
        title={loading ? "Loading..." : "Send"}
        onPress={send}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  chat: {
    flex: 1,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
});
