type TypeValue = {
  userId: string;
  userName: string;
  roomId: string;
};

const storage = {
  get: (key: string): TypeValue =>
    window.localStorage.getItem(key)
      ? JSON.parse(window.localStorage.getItem(key) as string)
      : null,
  set: (key: string, value: TypeValue) =>
    window.localStorage.setItem(key, JSON.stringify(value)),
};

export default storage;
