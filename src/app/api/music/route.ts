import { NextResponse } from "next/server";

import getAuth from "@/lib/getAuth";
import errorHandler from "@/lib/errorHandler";
import { validatePostMusicConversationPayload } from "@/validator/conversationValidator";
import { createMusicConversation } from "@/service/replicateService";


export async function POST(req: Request) {
  try {
    getAuth();

    const body = await req.json();
    validatePostMusicConversationPayload(body);

    const data = await createMusicConversation(body);

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
