import { useId } from "react";

import Button from "../../Button";
import CenteredText from "../../CenteredText";
import Input from "../../Input";
import { useGetUser } from "../../../hooks";
import { useUserPanelContext } from "../userPanelContext";
import { User } from "../../../models";
import { labels } from "./constants";

export default function RightPanel() {
  const id = useId();
  const { selectedUserId } = useUserPanelContext();
  const { data: user, isFetching } = useGetUser(selectedUserId);

  let content;
  if (!selectedUserId) content = <CenteredText text="Select a user to edit" />;
  if (isFetching) content = <CenteredText text="Loading user..." />;
  if (selectedUserId && user)
    content = (
      <form className="flex flex-col m-8 mt-10 sm:m-5">
        {labels.map(({ label, key }) => (
          <Input
            key={`${label}-${id}`}
            label={label}
            onChange={() => {}}
            value={user[key as keyof User]}
          />
        ))}

        <div className="flex justify-end">
          <Button className="bg-cancel-btn-bg hover:bg-cancel-btn-bg-hover text-black mr-2">
            Cancel
          </Button>
          <Button className="bg-save-btn-bg hover:bg-save-btn-bg-hover text-white">
            Save
          </Button>
        </div>
      </form>
    );
  return (
    <div className="bg-white h-[60%] sm:h-screen w-1/3 sm:w-full">
      {content}
    </div>
  );
}
