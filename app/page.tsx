'use client';
import { useChat } from 'ai/react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Paperclip, Send, X } from 'lucide-react';
import mermaid from 'mermaid';

const Mermaid = ({ src }: { src: string }) => {
  const elementId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });

    // 既存の内容をクリアして再レンダリング
    const element = document.getElementById(elementId.current);
    if (element) {
      element.innerHTML = src;
      mermaid.run({
        nodes: [element]
      });
    }
  }, [src]);

  return (
    <div id={elementId.current} className="mermaid">
      {src}
    </div>
  );
};

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FileListをArrayに変換するヘルパー関数
  const fileListToArray = (fileList: FileList | undefined) => {
    if (!fileList) return [];
    return Array.from(fileList);
  };

  // ファイルを削除する関数
  const removeFile = (indexToRemove: number) => {
    if (!files) return;

    const newFiles = fileListToArray(files).filter((_, index) => index !== indexToRemove);
    const dataTransfer = new DataTransfer();
    newFiles.forEach(file => dataTransfer.items.add(file));
    setFiles(dataTransfer.files);

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const renderMessage = (content: string) => {
    const mermaidRegex = /```mermaid\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = mermaidRegex.exec(content)) !== null) {
      // mermaidブロックの前のテキストを追加
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }

      // Mermaidコンポーネントを使用
      parts.push(
        <Mermaid key={Math.random().toString(36).substr(2, 9)} src={match[1]} />
      );

      lastIndex = match.index + match[0].length;
    }

    // 残りのテキストを追加
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return <>{parts}</>;
  };

  return (
    <div className="flex flex-col w-full h-full max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto py-4 px-4">
        {messages.map(m => (
          <div key={m.id} className="mb-4">
            <div className="whitespace-pre-wrap rounded-lg bg-gray-100 p-3">
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {renderMessage(m.content)}
            </div>
            <div className="mt-2">
              {m?.experimental_attachments
                ?.filter(attachment =>
                  attachment?.contentType?.startsWith('image/'),
                )
                .map((attachment, index) => (
                  <Image
                    key={`${m.id}-${index}`}
                    src={attachment.url}
                    width={300}
                    height={300}
                    alt={attachment.name ?? `attachment-${index}`}
                    className="rounded-lg"
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t bg-white p-4">
        {/* 添付ファイルのプレビュー */}
        {files && files.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {fileListToArray(files).map((file, index) => (
              <div
                key={index}
                className="relative group rounded-lg border border-gray-200 p-2 pr-8"
              >
                <div className="text-sm text-gray-600 max-w-[200px] truncate">
                  {file.name}
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        <form
          className="flex items-end gap-2"
          onSubmit={event => {
            handleSubmit(event, {
              experimental_attachments: files,
            });
            setFiles(undefined);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
        >
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5 text-gray-500" />
          </button>
          <input
            type="file"
            className="hidden"
            onChange={event => {
              if (event.target.files) {
                setFiles(event.target.files);
              }
            }}
            multiple
            ref={fileInputRef}
            accept="image/*"
          />
          <div className="relative flex-1">
            <input
              className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-10 focus:border-gray-400 focus:outline-none"
              value={input}
              placeholder="質問を入力してください"
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}