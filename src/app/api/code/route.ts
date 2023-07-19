import { NextResponse } from "next/server";

import getAuth from "@/lib/getAuth";
import errorHandler from "@/lib/errorHandler";
import { validatePostCodeConversationPayload } from "@/validator/conversationValidator";
import { createCodeConversation } from "@/service/chatService";


export async function POST(req: Request) {
  try {
    getAuth();

    const body = await req.json();
    validatePostCodeConversationPayload(body);

    const data = await createCodeConversation(body);

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
