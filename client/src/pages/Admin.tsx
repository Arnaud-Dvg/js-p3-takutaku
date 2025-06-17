import UserManagement from "../components/admin/UsersManagement";

function Admin() {
  return (
    <>
      <h1 className="text-white justify-center text-2xl pt-6 text-center">
        Tableau de bord
        <br />
        d’administration
      </h1>
      <UserManagement />
    </>
  );
}

export default Admin;
