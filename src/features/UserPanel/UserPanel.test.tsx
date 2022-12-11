import userEvent from "@testing-library/user-event";
import { User } from "../../models";
import { firstUser, secondUser } from "../../tests/mockData";
import {
  renderWithQueryClient,
  screen
} from "../../tests/renderWithQueryClient";
import { labels } from "./RightPanel/constants";
import UserPanel from "./UserPanel";

// eslint-disable-next-line testing-library/no-render-in-setup
beforeEach(() => renderWithQueryClient(<UserPanel />));

test("select user message should appear on the right panel", () => {
  expect(screen.getByText("Select a user to edit")).toBeInTheDocument();
});

test("when clicking on the left panel's user card item the right panel should be populated with 5 inputs with relevat user info", async () => {
  const userCardsEl = await screen.findAllByRole("img");

  await userEvent.click(
    // eslint-disable-next-line testing-library/no-node-access
    userCardsEl[0].parentElement?.parentElement as HTMLElement
  );

  expect(await screen.findAllByRole("textbox")).toHaveLength(5);
  labels.forEach(async ({ label, key }) => {
    expect(await screen.findByPlaceholderText(`Enter ${label}`)).toHaveValue(
      firstUser[key as keyof User]
    );
  });

  await userEvent.click(
    // eslint-disable-next-line testing-library/no-node-access
    userCardsEl[1].parentElement?.parentElement as HTMLElement
  );
  expect(await screen.findAllByRole("textbox")).toHaveLength(5);
  labels.forEach(async ({ label, key }) => {
    expect(await screen.findByPlaceholderText(`Enter ${label}`)).toHaveValue(
      secondUser[key as keyof User]
    );
  });
});

test("when clicking on the left panel's user card item the right panel should have 2 buttons save & cancel", async () => {
  const userCardsEl = await screen.findAllByRole("img");

  await userEvent.click(
    // eslint-disable-next-line testing-library/no-node-access
    userCardsEl[0].parentElement?.parentElement as HTMLElement
  );

  expect(
    await screen.findByRole("button", { name: "Save" })
  ).toBeInTheDocument();
  expect(
    await screen.findByRole("button", { name: "Cancel" })
  ).toBeInTheDocument();
});
