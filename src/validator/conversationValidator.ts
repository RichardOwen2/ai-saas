import Joi from "joi";
import InvariantError from "@/lib/errors/InvariantError";

export const validatePostConversationPayload = (payload: any) => {
  const schema = Joi.object({
    messages: Joi.array().items(
      Joi.any().required(),
    ).min(1).required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}

export const validatePostCodeConversationPayload = (payload: any) => {
  const schema = Joi.object({
    messages: Joi.array().items(
      Joi.any().required(),
    ).min(1).required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}

export const validatePostImageConversationPayload = (payload: any) => {
  const schema = Joi.object({
    prompt: Joi.string().min(1).required(),
    amount: Joi.string().valid('1', '2', '3', '4', '5'),
    resolution: Joi.string().valid('256x256', '512x512', '1024x1024'),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}

export const validatePostMusicConversationPayload = (payload: any) => {
  const schema = Joi.object({
    prompt: Joi.string().min(1).required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}

export const validatePostVideoConversationPayload = (payload: any) => {
  const schema = Joi.object({
    prompt: Joi.string().min(1).required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}
