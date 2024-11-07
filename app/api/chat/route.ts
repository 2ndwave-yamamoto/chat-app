import { getGoogleGenerativeAI } from '@/lib/model';
import { convertToCoreMessages, streamText } from 'ai';
import path from 'path';
import fs from 'fs/promises';
export async function POST(req: Request) {
  const { messages } = await req.json();

  // generate er diagramを読み込む
  const generateErDiagramPrompt = await fs.readFile(
    path.join(process.cwd(), 'prompts/generate-er-diagram.txt'),
    'utf8',
  );

  // 最後のメッセージを使用するように変更
  const lastMessage = messages[messages.length - 1];
  const prompt = generateErDiagramPrompt.replace('{{ message }}', lastMessage.content);

  const result = await streamText({
    model: getGoogleGenerativeAI(),
    messages: convertToCoreMessages([{ role: 'user', content: prompt }]),
  });

  console.log(prompt);

  return result.toDataStreamResponse();
}