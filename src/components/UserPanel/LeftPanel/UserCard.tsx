/* eslint-disable jsx-a11y/img-redundant-alt */
import { User } from "../../../models";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="flex items-center space-x-4 m-2 mb-5 cursor-pointer">
      <div className="flex-shrink-0">
        <img
          className="w-16 h-16 rounded-full"
          src={user.photo}
          alt={`${user.name} image`}
        />
      </div>
      <div className="flex-1 min-w-0 sm:hidden">
        <p className="text-md font-medium text-gray-900 truncate">
          {user.name}
        </p>
        {user.email && (
          <p className="text-md text-grey truncate">{user.email}</p>
        )}
      </div>
    </div>
  );
}
