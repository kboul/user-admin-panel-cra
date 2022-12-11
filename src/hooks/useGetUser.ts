import { useQuery } from "@tanstack/react-query";

import { getUser } from "../api";

const useGetUser = (selectedUserId: string) =>
  useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => getUser(selectedUserId),
    enabled: !!selectedUserId,
    staleTime: 60000 // 1min
  });

export default useGetUser;
