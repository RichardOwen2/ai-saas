import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import ServerError from "@/lib/errors/ServerError";

interface conversationParams {
  messages: ChatCompletionRequestMessage[]
}

interface codeConversationParams {
  messages: ChatCompletionRequestMessage[]
}

interface imageConversationParams {
  prompt: string;
  amount: '1' | '2' | '3' | '4' | '5';
  resolution: '256x256' | '512x512' | '1024x1024';
}


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const createConversation = async ({ messages }: conversationParams) => {
  if (!configuration.apiKey) {
    throw new ServerError("OpenAI API Key not configured")
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });

  if (!response.data.choices[0].message) {
    throw new ServerError("Something wrong happen");
  }

  return response.data.choices[0].message;
}

export const createCodeConversation = async ({ messages }: codeConversationParams) => {
  if (!configuration.apiKey) {
    throw new ServerError("OpenAI API Key not configured")
  }

  const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comment for explanations."
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [instructionMessage, ...messages],
  });

  if (!response.data.choices[0].message) {
    throw new ServerError("Something wrong happen");
  }

  return response.data.choices[0].message;
}

export const createImageConversation = async ({ prompt, amount, resolution }: imageConversationParams) => {
  if (!configuration.apiKey) {
    throw new ServerError("OpenAI API Key not configured")
  }

  const response = await openai.createImage({
    prompt,
    n: parseInt(amount),
    size: resolution,
  });

  if (!response.data.data) {
    throw new ServerError("Something wrong happen");
  }

  return response.data.data.map(({ url }) => url);
}

