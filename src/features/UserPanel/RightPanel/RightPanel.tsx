import {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  MouseEvent
} from "react";
import { useMutation } from "@tanstack/react-query";

import { Button, CenteredText, Input } from "../../../components";
import { useGetUser } from "../../../hooks";
import { useUserPanelContext } from "../userPanelContext";
import { User } from "../../../models";
import { updateUser } from "../../../api";
import { queryClient } from "../../../queryClient";
import { labels } from "./constants";

type ClickEvent = MouseEvent<HTMLElement>;

export default function RightPanel() {
  const id = useId();
  const { selectedUserId } = useUserPanelContext();
  const { data: user, isFetching } = useGetUser(selectedUserId);

  const [userData, setUserData] = useState({} as User);
  useEffect(() => {
    if (user && Object.keys(user).length > 0) setUserData(user);
  }, [user]);

  const userDataNotChanged = useMemo(() => {
    if (!user || Object.keys(userData).length === 0) return true;
    return Object.keys(user).every(
      (key) => user[key as keyof User] === userData[key as keyof User]
    );
  }, [user, userData]);

  const { mutate } = useMutation(updateUser, {
    onSuccess: () => queryClient.setQueryData(["user", userData.id], userData)
  });

  const handleSaveClick = useCallback(
    (e: ClickEvent) => {
      e.preventDefault();
      const { id, ...userWithoutId } = userData;
      mutate({ userId: id as string, user: userWithoutId });
    },
    [userData, mutate]
  );

  const handleCancelClick = useCallback(
    (e: ClickEvent) => {
      e.preventDefault();
      if (user) setUserData(user);
    },
    [user]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  let content;
  if (!selectedUserId) content = <CenteredText text="Select a user to edit" />;
  if (isFetching) content = <CenteredText text="Loading user..." />;
  if (selectedUserId && user) {
    const showCancelBtn = user.id === userData.id && !userDataNotChanged;

    content = (
      <form className="flex flex-col m-8 mt-10 sm:m-5">
        {labels.map(({ label, key }) => (
          <Input
            key={`${key}-${id}`}
            label={label}
            name={key}
            onChange={handleChange}
            value={userData[key as keyof User] ?? ""}
          />
        ))}

        <div className="flex justify-end">
          {showCancelBtn && (
            <Button
              className="bg-cancel-btn-bg hover:bg-cancel-btn-bg-hover text-black mr-2"
              onClick={handleCancelClick}>
              Cancel
            </Button>
          )}
          <Button
            className="bg-save-btn-bg hover:bg-save-btn-bg-hover text-white"
            disabled={userDataNotChanged}
            onClick={handleSaveClick}>
            Save
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-white h-[60%] sm:h-screen w-1/3 sm:w-9/12 overflow-y-auto">
      {content}
    </div>
  );
}
