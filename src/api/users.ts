import { User } from "../models";
import { baseUrl } from "./baseUrl";

const getUsers = async (): Promise<User[]> =>
  fetch(baseUrl).then((res) => res.json());

const getUser = async (userId: string): Promise<User> =>
  fetch(`${baseUrl}/${userId}`).then((res) => res.json());

const updateUser = async ({
  userId,
  user
}: {
  userId: string;
  user: User;
}): Promise<{ id: string }> =>
  fetch(`${baseUrl}/${userId}`, {
    method: "PUT",
    body: JSON.stringify(user)
  }).then((res) => res.json());

export { getUsers, getUser, updateUser };
