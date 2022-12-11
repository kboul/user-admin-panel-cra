import { useQuery } from "@tanstack/react-query";

import { CenteredText } from "../../../components";
import UserCard from "./UserCard";
import { getUsers } from "../../../api";
import { useGetUser } from "../../../hooks";
import { User } from "../../../models";
import { useUserPanelContext } from "../userPanelContext";

export default function LeftPanel() {
  const {
    isFetching,
    isError,
    data: users
  } = useQuery({ initialData: [], queryKey: ["users"], queryFn: getUsers });

  const { selectedUserId, setSelectedUserId } = useUserPanelContext();
  useGetUser(selectedUserId);

  let content;
  if (isFetching) content = <CenteredText text="Loading users..." />;

  if (users.length > 0) {
    const handleUserClick = (userId: string) => () => setSelectedUserId(userId);

    content = users?.map((user: User) => {
      return (
        <div key={user.id} onClick={handleUserClick(user.id!)}>
          <UserCard user={user} />
        </div>
      );
    });
  }

  if (isError)
    content = (
      <CenteredText text="There was an error while fetching the users." />
    );

  return (
    <div className="bg-white h-[60%] sm:h-screen w-1/3 sm:w-3/12 overflow-y-auto sm:scrollbar-hide">
      {content}
    </div>
  );
}
