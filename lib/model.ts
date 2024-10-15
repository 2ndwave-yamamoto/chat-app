// model.ts
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "node:process";

export function getGoogleGenerativeAI() {
  const google = createGoogleGenerativeAI({
    "apiKey": env.GOOGLE_GENERATIVE_AI_API_KEY
  });

  return google(env.GOOGLE_GENERATIVE_AI_MODEL || "gemini-1.5-flash-latest");
}