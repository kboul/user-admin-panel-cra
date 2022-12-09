import UserCard from "../UserCard";

export default function LeftPanel() {
  return (
    <div className="bg-white h-[60%] sm:h-screen w-1/3 sm:w-4/12 p-3 sm:p-1 overflow-y-auto">
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
    </div>
  );
}
