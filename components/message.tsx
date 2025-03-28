import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib";
import PureMarkdown from '@/components/pure-markdown';
import { Message as MessageType } from 'ai';

export default function Message({ message }: { message: MessageType }) {
  const m = message;

  // ユーザーメッセージの場合、改行をHTMLの改行タグに変換
  const formattedContent = m.role === 'user'
    ? m.content.replace(/\n/g, '<br />')
    : m.content;

  return (
    <div>
      <div className="flex">
        <div className="px-2 flex items-center">
          <Avatar>
            <AvatarFallback>
              {m.role === 'user' ? 'U' : 'AI'}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <div className="py-1 px-2 text-gray-500">
            {m.createdAt ? formatDate(m.createdAt) : ''}
          </div>
          <div className="py-1 px-2 ">
            {m.role === 'user' ? (
              <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
            ) : (
              <PureMarkdown>{m.content}</PureMarkdown>
            )}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
