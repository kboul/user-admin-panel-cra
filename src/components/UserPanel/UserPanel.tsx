import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

export default function UserPanel() {
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
