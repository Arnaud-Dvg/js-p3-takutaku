import ProfilePicture from "../components/account/ProfilePicture";
import ProfileSettings from "../components/account/ProfileSettings";
import Abonnement from "../components/home/Abonnement";

function Account() {
  return (
    <section className="mx-6 flex flex-col items-center justify-center">
      <h1 className="text-tertiary text-2xl pt-6 text-center">Mon compte</h1>
      <ProfilePicture />
      <ProfileSettings />
      <Abonnement />
    </section>
  );
}

export default Account;
