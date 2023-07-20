import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!
});

export const createMusicConversation = async ({ prompt }: { prompt: string }) => {
  const response = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", {
    input: {
      prompt_a: prompt
    }
  }) as {
    audio: string;
    spectrogram: string;
  };

  return response.audio;
}

export const createVideoConversation = async ({ prompt }: { prompt: string }) => {
  const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", {
    input: {
      prompt,
    },
  }) as string[];

  return response[0];
}
