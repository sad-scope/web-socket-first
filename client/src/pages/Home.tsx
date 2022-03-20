import { memo } from "react";
import { NameInput } from "modules/NameInput";
import { Room } from "modules/Room";
import { USER_KEY } from "configConstants";
import storage from "utils/storage";

function Home(): JSX.Element {
  const user = storage.get(USER_KEY);

  return user ? <Room /> : <NameInput />;
}

export default memo(Home);
