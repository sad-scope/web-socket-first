import { useEffect, useRef, useState } from "react";
import { SERVER_URI, USER_KEY } from "configConstants";
import { TypeUseChatHookResult, TypeMessage } from "types";
import { io } from "socket.io-client";
import storage from "utils/storage";

export default function useChat(): TypeUseChatHookResult {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [log, setLog] = useState("");

  const user = storage.get(USER_KEY);

  const { current: socket } = useRef(
    io(SERVER_URI, {
      query: {
        roomId: user.roomId,
        userName: user.userName,
      },
    })
  );

  useEffect(() => {
    socket.emit("user:add", user);

    socket.emit("message:get");

    socket.on("log", (log) => {
      setLog(log);
    });

    socket.on("user_list:update", (users) => {
      setUsers(users);
    });

    socket.on("message_list:update", (messages) => {
      setMessages(messages);
    });
  }, []);

  const sendMessage = (message: TypeMessage) => {
    console.log({ message });
    socket.emit("message:add", message);
  };

  const removeMessage = (message: TypeMessage) => {
    socket.emit("message:remove", message);
  };

  return { users, messages, log, sendMessage, removeMessage };
}
