import { createContext, useContext, useState } from "react";

// Typage des données du context
export type User = {
  id: number;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  is_admin: boolean;
  is_actif: boolean;
  abonnement_id: number;
  token: string;
};

// Typage du context User
type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  createUser: (newUser: Omit<User, "id">) => Promise<void>;
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUser: () => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  updateUser: (id: number, updateData: Partial<User>) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async (): Promise<void> => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Erreur lors du fetch utilisateur :", error);
    }
  };

  // Fonction qui gère la création de compte utilisateur
  const createUser = async (newUser: Omit<User, "id">): Promise<void> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const createdUser = await response.json();
      setUser(createdUser);
      setConnected(true);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  };

  // Fonction pour la mise à jour de la base de donnée des utilisateurs pour la page Admin
  const updateUser = async (
    id: number,
    updateData: Partial<User>,
  ): Promise<void> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(updateData),
      },
    );
    if (!response.ok) {
      throw new Error("Echec de la mise à jour de l'utilisateur");
    }

    const updatedUser = await response.json();

    // Mets à jour directement le contexte avec les nouvelles infos, en gardant le token actuel intact
    setUser((prevUser) => {
      return { ...prevUser, ...updatedUser, token: prevUser?.token || "" };
    });
  };

  // Fonction pour la suppression de la base de donnée des utilisateurs pour la page Admin
  const deleteUser = async (id: number): Promise<void> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error(
          `Echec de la suppression de l'utilisateur avec l'id ${id}: ${response.statusText}`,
        );
      }
      await fetchUser();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        connected,
        setConnected,
        createUser,
        fetchUser,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Création du hook personnalisé
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext doit être utilisé dans un UserProvider");
  }
  return context;
};
