import { NextResponse } from "next/server";

import getAuth from "@/lib/getAuth";
import errorHandler from "@/lib/errorHandler";
import { validatePostImageConversationPayload } from "@/validator/conversationValidator";
import { createImageConversation } from "@/service/chatService";


export async function POST(req: Request) {
  try {
    getAuth();

    const body = await req.json();
    validatePostImageConversationPayload(body);

    const data = await createImageConversation(body);

    return NextResponse.json({
      message: "success",
      data,
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      data,
    }, { status });
  }
};
