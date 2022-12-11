import { rest } from "msw";

import { baseUrl } from "../../../api";
import { users } from "../../../tests/mockData";
import {
  renderWithQueryClient,
  screen,
  waitFor
} from "../../../tests/renderWithQueryClient";
import server from "../../../tests/server";
import LeftPanel from "./LeftPanel";

test("loading message appears on the screen when components mounts", () => {
  renderWithQueryClient(<LeftPanel />);
  expect(screen.getByText("Loading users...")).toBeInTheDocument();
});

test("users appear on the screen", async () => {
  renderWithQueryClient(<LeftPanel />);

  const userPhotos = await screen.findAllByRole("img");
  users.forEach(async (user, index) => {
    expect(await screen.findByText(user.name)).toBeInTheDocument();
    expect(await screen.findByText(user.email)).toBeInTheDocument();
    expect(userPhotos[index].getAttribute("src")).toBe(user.photo);
  });
});

test("server error generates the appropriate message on the screen", async () => {
  server.resetHandlers(
    rest.get(baseUrl, (_, res, ctx) => res(ctx.status(500)))
  );
  renderWithQueryClient(<LeftPanel />);

  await waitFor(async () => {
    expect(
      await screen.findByText("There was an error while fetching the users.")
    ).toBeInTheDocument();
  });
});
