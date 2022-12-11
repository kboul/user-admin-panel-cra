import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import UserPanelContextProvider from "./userPanelContext";

export default function UserPanel() {
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <UserPanelContextProvider>
        <LeftPanel />
        <RightPanel />
      </UserPanelContextProvider>
    </div>
  );
}
