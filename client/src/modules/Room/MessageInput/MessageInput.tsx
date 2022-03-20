import { memo, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { FiSend } from "react-icons/fi";
import fileApi from "api/file.api";
import storage from "utils/storage";
import { USER_KEY } from "configConstants";
import { TypeSendMessage, TypeMessage } from "types";
import styles from "./MessageInput.module.scss";

type Props = {
  sendMessage: TypeSendMessage;
};

function MessageInput({ sendMessage }: Props): JSX.Element {
  const user = storage.get(USER_KEY);
  const [text, setText] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ e });
    const { userId, userName, roomId } = user;
    let message: TypeMessage = {
      messageId: nanoid(),
      userId,
      userName,
      roomId,
      textOrPathToFile: text,
      messageType: "text",
    };

    sendMessage(message);

    setText("");
  };

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles["input"]}
        autoFocus
        placeholder="Сообщение..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
      />
      <button className={styles["button"]} type="submit">
        <FiSend className={styles["icon"]} />
      </button>
    </form>
  );
}

export default memo(MessageInput);
