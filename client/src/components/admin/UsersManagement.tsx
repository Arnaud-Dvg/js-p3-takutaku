import { useEffect, useState } from "react";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  is_admin: boolean;
  is_actif: boolean;
  abonnement: string;
};

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [liste, setListe] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3310/api/users-with-abonnement")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        console.info(data);
      });
  }, []);

  return (
    <>
      <h1 className="text-[var(--color-secondary)] pt-6 pl-10 text-xl">
        Gestion des utilisateurs
      </h1>
      <p className="text-white pt-4 pl-10">
        Nombre total de comptes: {users.length}
      </p>
      <div>
        <button
          type="button"
          className="bg-white"
          onClick={() => setListe(!liste)}
        >
          {liste ? "Masquer les utilisateurs" : "Voir les utilisateurs"}
        </button>
        {liste && (
          <div className="text-white px-10 pt-6">
            {/* En-têtes */}
            <div className="grid grid-cols-3 text-yellow-400 font-bold mb-2 text-sm">
              <div>Nom d’utilisateur</div>
              <div>E-mail</div>
              <div>Abonnements</div>
            </div>

            {/* Données */}
            {users.map((user) => (
              <div key={user.id} className="grid grid-cols-3 py-1 text-xs">
                <div>{user.firstname}</div>
                <div>{user.mail}</div>
                <div>{user.abonnement}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UserManagement;
