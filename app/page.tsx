'use client';

import { useChat } from '@ai-sdk/react';
import Message from '@/components/message';
import Sideber from '@/components/sideber';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex h-full">
      <Sideber />
      <div className="flex-1 flex flex-col relative">
        <div className="absolute inset-0 bottom-14 overflow-y-auto p-4 pb-2">
          {messages.map(m => (
            <Message key={m.id} message={m} />
          ))}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-14 border-t border-gray-200 bg-white">
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