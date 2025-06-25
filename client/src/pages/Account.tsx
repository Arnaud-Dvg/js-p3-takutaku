import LogOutButton from "../components/account/LogOutButton";
import ProfilePicture from "../components/account/ProfilePicture";
import ProfileSettings from "../components/account/ProfileSettings";
import Abonnement from "../components/home/Abonnement";
import SelectPicture from "../components/account/ChooseProfilePicture";

function Account() {
  return (
    <section className="mx-6 flex flex-col items-center justify-center">
      <LogOutButton />
      <SelectPicture />
      <h1 className="text-tertiary text-2xl pt-6 text-center">Mon compte</h1>
      <ProfilePicture />
      <ProfileSettings />
      <Abonnement />
    </section>

  );
}

export default Account;
