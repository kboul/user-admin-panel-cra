import { rest } from "msw";

import { baseUrl } from "../api/baseUrl";
import { users } from "./mockData";

export const handlers = [
  rest.get(baseUrl, (_, res, ctx) => res(ctx.json(users)))
];
