import { rest } from "msw";

import { baseUrl } from "../api";
import { firstUser, secondUser, users } from "./mockData";

export const handlers = [
  rest.get(baseUrl, (_, res, ctx) => res(ctx.json(users))),
  rest.get(`${baseUrl}/5c093af1c6ee9117a581c7d6`, (_, res, ctx) =>
    res(ctx.json(firstUser))
  ),
  rest.get(`${baseUrl}/5c093af1aeca1bb00607fb2a`, (_, res, ctx) =>
    res(ctx.json(secondUser))
  )
];
