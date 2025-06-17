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
  const [open, setOpen] = useState(false);

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
        Nombre total de comptes : {users.length}
      </p>
      <div className="pl-10 pt-4">
        <button
          type="button"
          className="bg-white text-black font-semibold py-1 px-3 rounded"
          onClick={() => setListe(!liste)}
        >
          {liste ? "Masquer les utilisateurs" : "Voir les utilisateurs"}
        </button>
      </div>
      {liste && (
        <div className="overflow-x-auto px-10 pt-6">
          {/* En-têtes */}
          <div className="grid grid-cols-[2fr_3fr_1fr_1fr_1fr_1fr] text-yellow-400 font-bold text-sm min-w-[900px]">
            <div>Utilisateur</div>
            <div>E-mail</div>
            <div>Abonnement</div>
            <div>Admin ?</div>
            <div>Modifier</div>
            <div>Supprimer</div>
          </div>

          {/* Données */}
          {users.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-[2fr_3fr_1fr_1fr_1fr_1fr] py-1 text-xs text-white min-w-[900px] items-center"
            >
              <div>
                {user.firstname} {user.lastname}
              </div>
              <div className="break-all">{user.mail}</div>
              <div>{user.abonnement}</div>
              <div>{user.is_admin}</div>
              <div>
                <button type="button">
                  <img
                    src="./public/change.png"
                    alt="modifier"
                    className="w-4"
                  />
                </button>
              </div>
              <div>
                <button type="button">
                  <img
                    src="./public/trash.png"
                    alt="supprimer"
                    className="w-4"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Bouton d'ajout d'utilisateur */}
      <div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-white text-black font-semibold py-1 px-3 rounded"
        >
          + Nouvel utilisateur
        </button>
      </div>

      {/* Pop-Up */}
      {open && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
          <section className="relative bg-black text-white rounded-lg w-full max-w-lg p-8">
            {/* Logo TakuTaku */}
            <section className="text-center mb-10">
              <img
                src="/public/logo_taku.png"
                alt="Logo TakuTaku"
                className="mx-auto h-15"
              />
            </section>

            {/* Titre */}
            <h2 className="text-2xl font-semibold text-center mb-6">
              Ajouter un utilisateur
            </h2>

            {/* Nom / Prénom */}
            <section className="flex gap-4">
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                required
                className="w-1/2 bg-black border border-white text-white px-4 py-2 rounded-full text-sm"
              />
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                required
                className="w-1/2 bg-black border border-white text-white px-4 py-2 rounded-full text-sm"
              />
            </section>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              required
              className="w-full bg-black border border-white text-white px-4 py-2 rounded-full text-sm"
            />

            {/* Mot de passe */}
            <input
              type="text"
              name="mot de passe"
              placeholder="Mot de passe"
              required
              className="w-full bg-black border border-white text-white px-4 py-2 rounded-full text-sm"
            />

            {/* Admin ? */}
            <select
              name="admin"
              required
              className="w-full bg-black border border-white text-white px-4 py-2 rounded-2xl text-sm"
            >
              <option value="">-- Admin ? --</option>
              <option value="1">Oui</option>
              <option value="2">Non</option>
            </select>

            {/* Abonnement ? */}
            <select
              name="abonnement"
              required
              className="w-full bg-black border border-white text-white px-4 py-2 rounded-2xl text-sm"
            >
              <option value="">-- Choisir un abonnement --</option>
              <option value="1">Premium</option>
              <option value="2">Gratuit</option>
            </select>

            {/* Actif ? */}
            <select
              name="actif"
              required
              className="w-full bg-black border border-white text-white px-4 py-2 rounded-2xl text-sm"
            >
              <option value="">-- Actif ? --</option>
              <option value="1">Oui</option>
              <option value="2">Non</option>
            </select>

            {/* Mascotte + Bouton envoyer */}
            <section className="flex justify-between items-end mt-4">
              <img src="/favicon.ico" alt="Mascotte" className="h-15" />
              <button
                type="submit"
                className="text-secondary font-bold text-lg hover:text-secondary pb-10 "
              >
                Ajouter
              </button>
            </section>

            {/* Bouton fermer */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-white text-xl font-bold"
            >
              &times;
            </button>
          </section>
        </section>
      )}
    </>
  );
}

export default UserManagement;
