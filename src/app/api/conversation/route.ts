import { NextResponse } from "next/server";

import getAuth from "@/lib/getAuth";
import errorHandler from "@/lib/errorHandler";
import { validatePostConversationPayload } from "@/validator/conversationValidator";
import { createConversation } from "@/service/chatService";


export async function POST(req: Request) {
  try {
    // getAuth();

    const body = await req.json();
    validatePostConversationPayload(body);

    const data = await createConversation(body);

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
