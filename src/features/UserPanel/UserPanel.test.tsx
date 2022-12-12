import userEvent from "@testing-library/user-event";
import { User } from "../../models";
import { firstUser, secondUser } from "../../tests/mockData";
import {
  fireEvent,
  renderWithQueryClient,
  screen,
  waitFor
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

  await userEvent.click(userCardsEl[0]);

  expect(screen.getByText("Loading user...")).toBeInTheDocument();

  expect(await screen.findAllByRole("textbox")).toHaveLength(5);
  labels.forEach(async ({ label, key }) => {
    expect(await screen.findByPlaceholderText(`Enter ${label}`)).toHaveValue(
      firstUser[key as keyof User]
    );
  });

  await userEvent.click(userCardsEl[1]);
  expect(await screen.findAllByRole("textbox")).toHaveLength(5);
  labels.forEach(async ({ label, key }) => {
    expect(await screen.findByPlaceholderText(`Enter ${label}`)).toHaveValue(
      secondUser[key as keyof User]
    );
  });
});

test("when clicking on the left panel's user card item the right panel should have 2 buttons save & cancel", async () => {
  const userCardsEl = await screen.findAllByRole("img");

  await userEvent.click(userCardsEl[0]);

  expect(await screen.findByRole("button", { name: "Save" })).toBeDisabled();
  expect(
    screen.queryByRole("button", { name: "Cancel" })
  ).not.toBeInTheDocument();
});

test("editing a user and clicking on cancel btn reverts the user input state, hides cancel btn & makes save btn disabled", async () => {
  const userCardsEl = await screen.findAllByRole("img");

  await userEvent.click(userCardsEl[0]);

  const firstUserNameEl = await screen.findByPlaceholderText("Enter name");
  const firstUserEmailEl = await screen.findByPlaceholderText(
    "Enter email address"
  );

  fireEvent.change(firstUserNameEl, { target: { value: "Bates" } });
  fireEvent.change(firstUserEmailEl, {
    target: { value: "bates.washington@gmail.com" }
  });

  const cancelBtn = await screen.findByRole("button", { name: "Cancel" });
  expect(cancelBtn).toBeInTheDocument();

  await userEvent.click(cancelBtn);

  expect(firstUserNameEl).toHaveValue(firstUser.name);
  expect(firstUserEmailEl).toHaveValue(firstUser.email);

  expect(await screen.findByRole("button", { name: "Save" })).toBeDisabled();
});

test(`editing a user and clicking on save btn saves the new input,
     toggling cards and coming back should maintain the altered input, 
     btn state should be the initial`, async () => {
  const userCardsEl = await screen.findAllByRole("img");

  await userEvent.click(userCardsEl[0]);

  const firstUserNameEl = await screen.findByPlaceholderText("Enter name");
  const firstUserEmailEl = await screen.findByPlaceholderText(
    "Enter email address"
  );

  const newNameValue = "Kostas Boul";
  const newEmailValue = "kostas@gmail.com";
  fireEvent.change(firstUserNameEl, { target: { value: newNameValue } });
  fireEvent.change(firstUserEmailEl, {
    target: { value: newEmailValue }
  });

  const saveBtn = await screen.findByRole("button", { name: "Save" });
  expect(saveBtn).not.toBeDisabled();

  expect(firstUserNameEl).toHaveValue(newNameValue);
  expect(firstUserEmailEl).toHaveValue(newEmailValue);
  await userEvent.click(saveBtn);

  await userEvent.click(userCardsEl[1]);
  await userEvent.click(userCardsEl[0]);

  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => expect(firstUserNameEl).toHaveValue(newNameValue));

  expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  expect(
    screen.queryByRole("button", { name: "Cancel" })
  ).not.toBeInTheDocument();
});
