import { memo } from "react";
import useChat from "hooks/useChat";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import UserList from "./UserList";

function Room(): JSX.Element {
  const { users, messages, log, sendMessage, removeMessage } = useChat();
  return (
    <div>
      <MessageList
        messages={messages}
        log={log}
        removeMessage={removeMessage}
      />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default memo(Room);
