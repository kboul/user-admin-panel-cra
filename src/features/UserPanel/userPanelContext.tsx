import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction
} from "react";

interface Value {
  selectedUserId: string;
  setSelectedUserId: Dispatch<SetStateAction<string>>;
}

const UserPanelContext = createContext({} as Value);

export const useUserPanelContext = () => useContext(UserPanelContext!);

interface UserPanelContextProviderProps {
  children: ReactNode;
}

const UserPanelContextProvider = ({
  children
}: UserPanelContextProviderProps) => {
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
