import { useQuery } from "@tanstack/react-query";

import UserCard from "./UserCard";
import { getUsers } from "../../../api";
import { useGetUser } from "../../../hooks";
import { User } from "../../../models";
import { useUserPanelContext } from "../userPanelContext";
import { centeredItemClassName } from "./styles";

export default function LeftPanel() {
  const {
    isFetching,
    isError,
    data: users
  } = useQuery({ initialData: [], queryKey: ["users"], queryFn: getUsers });

  const { selectedUserId, setSelectedUserId } = useUserPanelContext();
  useGetUser(selectedUserId);

  const handleUserClick = (userId: string) => () => setSelectedUserId(userId);

  let content;
  if (isFetching)
    content = <p className={centeredItemClassName}>Loading users...</p>;

  if (users.length > 0) {
    content = users?.map((user: User) => {
      const cardBg =
        selectedUserId === user.id ? "bg-user-selected-bg" : "bg-transparent";
      return (
        <div
          className={`hover:bg-user-hover-bg ${cardBg}`}
          key={user.id}
          onClick={handleUserClick(user.id!)}>
          <UserCard user={user} />
        </div>
      );
    });
  }

  if (isError)
    content = (
      <p className={centeredItemClassName}>
        There was an error while fetching the users.
      </p>
    );
  return (
    <div className="bg-white h-[60%] sm:h-screen w-1/3 sm:w-4/12 p-3 sm:p-1 overflow-y-auto">
      {content}
    </div>
  );
}
