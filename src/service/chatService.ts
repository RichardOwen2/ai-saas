import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import ServerError from "@/lib/errors/ServerError";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const createConversation = async ({ messages }: { messages: ChatCompletionRequestMessage[] }) => {
  if (!configuration.apiKey) {
    throw new ServerError("OpenAI API Key not configured")
  }

  const chat = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });

  if (!chat.data.choices[0].message) {
    throw new ServerError("Something wrong happen");
  }

  return chat.data.choices[0].message;
}