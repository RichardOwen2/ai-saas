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
