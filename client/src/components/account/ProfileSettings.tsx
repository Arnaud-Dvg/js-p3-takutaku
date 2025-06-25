import { FaCog } from "react-icons/fa";
import { useUserContext } from "../../../context/UserContext";

function ProfileSettings() {
  const { user } = useUserContext();

  return (
    <>
      <section className="flex items-center text-tertiary my-4 mx-6 ">
        <FaCog />
        <h2 className="text-xl ml-2">Paramètres du compte</h2>
      </section>
      <section className="text-tertiary mx-6 my-4 flex flex-col gap-2">
        <p className="uppercase">Nom : {user?.lastname}</p>
        <p>Prénom : {user?.firstname}</p>
        <p>Adresse email : {user?.mail}</p>
        <p>Mot de passe : {user?.password}</p>
        <p>Abonnement : </p>
        <button
          type="button"
          className="border-1 border-tertiary rounded-full text-secondary my-2 p-2"
        >
          Modifier mes informations personnelles
        </button>
      </section>
    </>
  );
}

export default ProfileSettings;
