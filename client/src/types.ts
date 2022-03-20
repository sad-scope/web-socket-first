export type TypeUser = {
  userName: string;
  userId: string;
};

export type TypeMessage = {
  messageId: string;
  userId: string;
  userName: string;
  messageType: string;
  roomId: string;
  textOrPathToFile: string;
  createdAt?: string;
};

export type TypeRemoveMessage = (message: TypeMessage) => void;
export type TypeSendMessage = (message: TypeMessage) => void;

export type TypeUseChatHookResult = {
  users: TypeUser[];
  messages: TypeMessage[];
  log: string;
  sendMessage: TypeSendMessage;
  removeMessage: TypeRemoveMessage;
};
