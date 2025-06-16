// import { useEffect, useState } from "react";

function UserManagement() {
  //   const [user, setUser] = useState("");

  //   useEffect(() => {
  //     fetch("http://localhost:3310/api/")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setUser(data);
  //         console.info(data);
  //       });
  //   }, []);

  return (
    <>
      <h1 className="text-[var(--color-secondary)] pt-6 pl-10 text-xl">
        Gestion des utilisateurs
      </h1>
      <p className="text-white pt-4 pl-10">Nombre total de comptes: </p>
    </>
  );
}

export default UserManagement;
