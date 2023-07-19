import { auth } from "@clerk/nextjs";

import AuthenticationError from "./errors/AuthenticationError";

export default function getAuth() {
  const { userId } = auth();

  if (!userId) {
    throw new AuthenticationError("User Not Logged");
  }

  return { userId };
}