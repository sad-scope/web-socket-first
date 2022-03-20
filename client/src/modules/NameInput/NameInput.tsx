import { memo, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { USER_KEY } from "configConstants";
import storage from "utils/storage";
import styles from "./NameInput.module.scss";

type TypeOnChange = {
  target: {
    name: string;
    value: string;
  };
};

function NameInput(): JSX.Element {
  const [formData, setFormData] = useState({
    userName: "",
    roomId: "main_room",
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    const isSomeFieldEmpty = Object.values(formData).some((v) => !v.trim());
    setSubmitDisabled(isSomeFieldEmpty);
  }, [formData]);

  const onChange = ({ target: { name, value } }: TypeOnChange): void => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitDisabled) return;

    const userId = nanoid();

    storage.set(USER_KEY, {
      userId,
      userName: formData.userName,
      roomId: formData.roomId,
    });

    window.location.reload();
  };

  return (
    <div className={styles["wrapper"]}>
      <h2> Добро пожаловать </h2>
      <form onSubmit={onSubmit} className={styles["form"]}>
        <div>
          <label htmlFor="userName">Введите имя</label>
          <input
            type="text"
            id="userName"
            name="userName"
            minLength={2}
            required
            value={formData.userName}
            onChange={onChange}
          />
        </div>
        <div className="visually-hidden">
          <label htmlFor="roomId">Введите номер комнаты</label>
          <input
            type="text"
            id="roomId"
            name="roomId"
            minLength={4}
            required
            value={formData.roomId}
            onChange={onChange}
          />
        </div>
        <button disabled={submitDisabled} className="btn chat">
          Chat
        </button>
      </form>
    </div>
  );
}

export default memo(NameInput);
