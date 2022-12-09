import { baseUrl } from "./baseUrl";

const getUsers = async () => fetch(baseUrl).then((res) => res.json());

export { getUsers };
