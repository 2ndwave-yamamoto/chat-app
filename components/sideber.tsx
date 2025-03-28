import { useIsMobile } from "@/hooks/use-mobile";
import * as React from "react";
import { X, Menu } from "lucide-react";

export default function Sideber() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    // モバイル表示になったらサイドバーを閉じる
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-1.5 left-2 p-2 bg-gray-200 rounded-md z-10 flex items-center justify-center hover:bg-gray-300 transition-colors"
        aria-label="サイドバーを開く"
      >
        <Menu className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-200 relative">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-2 p-1.5 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center"
        aria-label="サイドバーを閉じる"
      >
        <X className="h-4 w-4" />
      </button>
      <h2 className="text-xl font-bold mb-4">チャット履歴</h2>
      <ul>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="mb-2"><a href="#" className="w-full block hover:bg-gray-200 p-2 rounded">チャット履歴{index + 1}</a></li>
        ))}
      </ul>
    </div>
  );
}
