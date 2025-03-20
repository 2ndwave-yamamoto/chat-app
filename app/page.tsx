'use client';

import { useChat } from '@ai-sdk/react';
import Message from '@/components/message';
import Sideber from '@/components/sideber';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useRef, useEffect, KeyboardEvent } from 'react';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // テキストエリアの高さを自動調整する関数
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // 一度高さをリセットして正確なスクロール高さを取得
      textarea.style.height = 'auto';
      // 入力内容に基づいて高さを調整（上方向に拡張）
      const newHeight = Math.min(textarea.scrollHeight, 200); // 最大高さを200pxに制限
      textarea.style.height = `${newHeight}px`;
    }
  };

  // 入力内容が変わったときに高さを調整
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    adjustTextareaHeight();
  };

  // キー入力を処理する関数
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // CommandキーまたはCtrlキー + Enterで送信
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault(); // デフォルトの改行を防止
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  // コンポーネントマウント時と入力値変更時に高さを調整
  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  return (
    <div className="flex h-full">
      <Sideber />
      <div className="flex-1 flex flex-col relative">
        <div className="absolute inset-0 bottom-14 overflow-y-auto p-4 pb-2">
          {messages.map(m => (
            <Message key={m.id} message={m} />
          ))}
        </div>
        <div className="absolute bottom-0 inset-x-0 border-t border-gray-200 bg-white">
          <div className="p-2">
            <form
              onSubmit={handleSubmit}
              className="flex w-full items-center gap-2"
            >
              <Textarea
                ref={textareaRef}
                className="flex-1 min-h-[40px] max-h-[200px] resize-none py-2.5"
                value={input}
                placeholder="Say something..."
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <Button type="submit" size="icon" className="shrink-0">
                <Send />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
