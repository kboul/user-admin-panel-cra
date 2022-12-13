/* eslint-disable jsx-a11y/img-redundant-alt */
import { User } from "../../../models";
import { useUserPanelContext } from "../userPanelContext";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const { selectedUserId } = useUserPanelContext();

  const isSelectedUser = selectedUserId === user.id;
  const nameTextColor = isSelectedUser ? "text-white" : "text-gray-900";
  const cardBg = isSelectedUser ? "bg-user-selected-bg" : "bg-transparent";
  const emailTextColor = isSelectedUser
    ? "text-email-selected-text"
    : "text-label-color";

  return (
    <div
      className={`flex items-center space-x-4 cursor-pointer p-3 sm:p-4 hover:bg-user-hover-bg ${cardBg}`}>
      <div className="flex-shrink-0">
        <img
          className="w-16 h-16 rounded-full"
          src={user.photo}
          alt={`${user.name} image`}
        />
      </div>
      <div className="flex-1 min-w-0 sm:hidden">
        <p className={`text-md font-medium ${nameTextColor} truncate`}>
          {user.name}
        </p>
        {user.email && (
          <p className={`text-sm ${emailTextColor} truncate`}>{user.email}</p>
        )}
      </div>
    </div>
  );
}
