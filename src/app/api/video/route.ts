import { NextResponse } from "next/server";

import getAuth from "@/lib/getAuth";
import errorHandler from "@/lib/errorHandler";
import { validatePostVideoConversationPayload } from "@/validator/conversationValidator";
import { createVideoConversation } from "@/service/replicateService";


export async function POST(req: Request) {
  try {
    getAuth();

    const body = await req.json();
    validatePostVideoConversationPayload(body);

    const data = await createVideoConversation(body);

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
