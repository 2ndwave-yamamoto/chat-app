import { getGoogleGenerativeAI } from '@/lib/model';
import { convertToCoreMessages, streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: getGoogleGenerativeAI(),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}