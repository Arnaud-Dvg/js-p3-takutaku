import { useUserContext } from "../../../context/UserContext";

function LogOutButton() {
  const { handleLogOut } = useUserContext();

  return (
    <button
      type="button"
      onClick={handleLogOut}
      className="mt-4 bg-secondary font-semibold text-primary py-1 px-7 lg:px-15 rounded-full"
    >
      SE DECONNECTER
    </button>
  );
}

export default LogOutButton;
