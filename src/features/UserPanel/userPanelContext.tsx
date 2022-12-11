import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface Value {
  selectedUserId: string;
  setSelectedUserId: React.Dispatch<React.SetStateAction<string>>;
}

const UserPanelContext = createContext({} as Value);

export const useUserPanelContext = () => useContext(UserPanelContext!);

const UserPanelContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUserId, setSelectedUserId] = useState("");

  const value = useMemo(
    () => ({ selectedUserId, setSelectedUserId }),
    [selectedUserId]
  );

  return (
    <UserPanelContext.Provider value={value}>
      {children}
    </UserPanelContext.Provider>
  );
};

export default UserPanelContextProvider;
