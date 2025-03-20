'use client';

import { useChat } from '@ai-sdk/react';
import Message from '@/components/message';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex h-full">
      {/* サイドバー */}
      <div className="w-64 h-full bg-gray-100 p-4 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-4">サイドバー</h2>
        <ul>
          <li className="mb-2"><a href="/" className="text-blue-600 hover:underline">ホーム</a></li>
          <li className="mb-2"><a href="/chat" className="text-blue-600 hover:underline">チャット</a></li>
          <li className="mb-2"><a href="/settings" className="text-blue-600 hover:underline">設定</a></li>
        </ul>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col h-full relative">
        <div className="absolute inset-0 bottom-14 overflow-y-auto px-4 pt-4 pb-2">
          {messages.map(m => (
            <Message key={m.id} message={m} />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-14 border-t border-gray-200 bg-white">
          <div className="p-2 h-full">
            <form
                  onSubmit={handleSubmit}
                  className="flex w-full h-full border border-gray-300 rounded shadow-xl overflow-hidden"
                >
                  <input
                    className="flex-1 px-3 outline-none"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                  />
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}