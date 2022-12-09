import { useQuery } from "@tanstack/react-query";

import UserCard from "../UserCard";
import { getUsers } from "../../api/getUsers";
import { User } from "../../models";

export default function LeftPanel() {
  const {
    isFetching,
    isError,
    data: users
  } = useQuery({ initialData: [], queryKey: ["users"], queryFn: getUsers });

  let content;
  if (isFetching)
    content = (
      <p className="flex justify-center items-center h-full">
        Loading users...
      </p>
    );

  if (users.length > 0)
    content = users?.map((user: User) => (
      <UserCard key={user.id} user={user} />
    ));

  if (isError)
    content = (
      <p className="flex justify-center items-center h-full">
        There was an error while fetching the users.
      </p>
    );
  return (
    <div className="bg-white h-[60%] sm:h-screen w-1/3 sm:w-4/12 p-3 sm:p-1 overflow-y-auto">
      {content}
    </div>
  );
}
