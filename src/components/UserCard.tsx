/* eslint-disable jsx-a11y/img-redundant-alt */
export default function UserCard() {
  return (
    <div className="flex items-center space-x-4 m-2 mb-5">
      <div className="flex-shrink-0">
        <img
          className="w-16 h-16 rounded-full"
          src="https://randomuser.me/api/portraits/men/40.jpg"
          alt="Neil image"
        />
      </div>
      <div className="flex-1 min-w-0 sm:hidden">
        <p className="text-md font-medium text-gray-900 truncate">
          Bates Washington
        </p>
        <p className="text-md text-grey truncate">
          bates.washington@zolarex.io
        </p>
      </div>
    </div>
  );
}
