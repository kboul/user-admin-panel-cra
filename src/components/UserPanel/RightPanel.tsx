const SelectUserMsg = () => (
  <div className="flex justify-center items-center h-full">
    Select a user to edit
  </div>
);

export default function RightPanel() {
  return (
    <div className="bg-white h-[60%] sm:h-screen w-1/3 sm:w-full">
      <SelectUserMsg />
    </div>
  );
}
