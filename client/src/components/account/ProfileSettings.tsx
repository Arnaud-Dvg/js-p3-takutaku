import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { useUserContext } from "../../../context/UserContext";
import type { User } from "../../../context/UserContext";

function ProfileSettings() {
  const { user, updateUser } = useUserContext();
  const [editMode, setEditMode] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`http://localhost:3310/api/user/${user?.id}`);
        const data = await res.json();
        setEditUser(data);
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs :", err);
      }
    };

    fetchUsers();
  }, [user?.id]);

  const handleChangeUser = (id: number, user: User) => {
    updateUser(id, user)
      .then(() => {
        fetch(`http://localhost:3310/api/user/${user.id}`)
          .then((res) => res.json())
          .then((data) => setEditUser(data));
      })
      .catch((err) => {
        console.error("Erreur lors de la modif :", err);
        alert("Modification échouée");
      });
  };

  return (
    <>
      <section className="flex items-center text-tertiary my-4 mx-6 ">
        <FaCog />
        <h2 className="text-xl ml-2">Paramètres du compte</h2>
      </section>

      <section className="text-tertiary mx-6 my-4 flex flex-col gap-2">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (editUser && editUser.id !== undefined) {
              updateUser(editUser.id, editUser);
            }
          }}
          method="PUT"
        >
          <label htmlFor="lastname">
            Nom : {""}
            <input
              id="lastname"
              name="lastname"
              className="uppercase"
              value={user?.lastname}
              onChange={(e) => {
                if (editUser) {
                  setEditUser({ ...editUser, lastname: e.target.value });
                }
              }}
              disabled={!editMode}
            />
          </label>

          <label htmlFor="firstname">
            Prénom : {""}
            <input
              id="firstname"
              name="firstname"
              value={user?.firstname}
              onChange={(e) => {
                if (editUser) {
                  setEditUser({ ...editUser, firstname: e.target.value });
                }
              }}
              disabled={!editMode}
            />
          </label>

          <label htmlFor="email">
            Adresse email : {""}
            <input
              id="email"
              name="mail"
              type="email"
              value={user?.mail}
              onChange={(e) => {
                if (editUser) {
                  setEditUser({ ...editUser, mail: e.target.value });
                }
              }}
              disabled={!editMode}
            />
          </label>

          <label htmlFor="password">
            Mot de passe : {""}
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={user?.password}
              onChange={(e) => {
                if (editUser) {
                  setEditUser({ ...editUser, password: e.target.value });
                }
              }}
              disabled={!editMode}
            />
          </label>

          <label htmlFor="subscription">
            Abonnement : {""}
            <input
              id="subscription"
              name="subscription"
              value={user?.abonnement_id}
              onChange={(e) => {
                if (editUser) {
                  setEditUser({
                    ...editUser,
                    abonnement_id: Number.parseInt(e.target.value),
                  });
                }
              }}
              disabled={!editMode}
            />
          </label>

          {!editMode && (
            <button
              type="button"
              className="border border-tertiary rounded-full text-secondary my-2 p-2 cursor-pointer"
              onClick={() => setEditMode(true)}
            >
              Modifier mes informations personnelles
            </button>
          )}

          {editMode && (
            <button
              type="submit"
              onSubmit={(e) => {
                e.preventDefault();
                if (editUser && editUser.id !== undefined) {
                  handleChangeUser(editUser.id, editUser);
                  setEditMode(false);
                }
              }}
              className="border border-tertiary rounded-full text-secondary my-2 p-2 cursor-pointer"
            >
              Enregistrer
            </button>
          )}
        </form>
      </section>
    </>
  );
}

export default ProfileSettings;
