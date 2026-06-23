import { HUGGING_FACE_API_KEY } from "@env";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `
You are an aerospace expert focused on SpaceX.
Answer only aerospace-related questions.
Answer in the language of the user.
If not related, answer with humour while reminding that you only are an aerospace expert, and dont really answer questions outside of that domain."
Be concise and factual.
`;

export async function askHuggingFace(messages: ChatMessage[]) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "moonshotai/Kimi-K2-Instruct-0905",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 512,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    console.log("HF ERROR:", data);
    throw new Error(data?.error || "Hugging Face error");
  }

  return data?.choices?.[0]?.message?.content;
}
