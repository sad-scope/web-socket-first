import { memo, useRef } from "react";
import { TypeMessage, TypeRemoveMessage } from "types";
import MessageItem from "./MessageItem";
import styles from "./MessageList.module.scss";

type Props = {
  messages: TypeMessage[];
  log: string;
  removeMessage: TypeRemoveMessage;
};

function MessageList({ messages, log, removeMessage }: Props): JSX.Element {
  return (
    <div className={styles["container"]}>
      <ul className={styles["list"]}>
        {messages.map((message) => (
          <MessageItem
            key={message.messageId}
            message={message}
            removeMessage={removeMessage}
          />
        ))}
      </ul>
    </div>
  );
}

export default memo(MessageList);
