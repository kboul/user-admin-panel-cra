import { createContext, ReactNode, useContext, useState } from "react";

function useValue() {
  const [selectedUserId, setSelectedUserId] = useState("");
  return { selectedUserId, setSelectedUserId };
}

type useValueReturnType = ReturnType<typeof useValue>;

const UserPanelContext = createContext({} as useValueReturnType);

export const useUserPanelContext = () => useContext(UserPanelContext!);

const UserPanelContextProvider = ({ children }: { children: ReactNode }) => (
  <UserPanelContext.Provider value={useValue()}>
    {children}
  </UserPanelContext.Provider>
);

export default UserPanelContextProvider;
