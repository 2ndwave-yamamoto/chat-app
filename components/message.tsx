import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { now } from "@/lib";
import PureMarkdown from '@/components/pure-markdown';
import { Message as MessageType } from 'ai';

export default function Message({ message }: { message: MessageType }) {
  const m = message;
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
          <div className="p-2">
            {now()}
          </div>
          <div className="p-2">
            <PureMarkdown>{m.content}</PureMarkdown>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
