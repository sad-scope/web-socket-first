import { memo, ReactNode } from "react";
import classNames from "classnames";
import { CgTrashEmpty } from "react-icons/cg";
import { GiSpeaker } from "react-icons/gi";
import TimeAgo from "react-timeago";
import { TypeMessage, TypeRemoveMessage } from "types";
import { USER_KEY, SERVER_URI } from "configConstants";
import storage from "utils/storage";
import styles from "./MessageItem.module.scss";

type Props = {
  message: TypeMessage;
  removeMessage: TypeRemoveMessage;
};

function MessageItem({ message, removeMessage }: Props): JSX.Element | null {
  const user = storage.get(USER_KEY);
  let element: ReactNode;

  const { messageType, textOrPathToFile } = message;

  const pathToFile = `${SERVER_URI}/files${textOrPathToFile}`;

  switch (messageType) {
    case "text":
      element = <p>{textOrPathToFile}</p>;
      break;
    case "image":
      element = <img src={pathToFile} alt="" />;
      break;
    case "audio":
      element = <audio src={pathToFile} controls />;
      break;
    case "video":
      element = <video src={pathToFile} controls />;
      break;
    default:
      return null;
  }

  const isMyMessage = user.userId === message.userId;

  return (
    <li
      className={classNames(styles["item"], {
        [styles["item__my-message"]]: isMyMessage,
      })}
    >
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <span className={styles["user-name"]}>
            {isMyMessage ? "Я" : message.userName}
          </span>
          {isMyMessage && (
            <button
              className={styles["trash"]}
              onClick={() => removeMessage(message)}
            >
              <CgTrashEmpty className={styles["trash__icon"]} />
            </button>
          )}
        </div>
        <div className={styles["content"]}>
          <div className={styles["message"]}>{element}</div>
          {message.createdAt && (
            <div className={styles["time"]}>
              <TimeAgo date={message.createdAt} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default memo(MessageItem);
