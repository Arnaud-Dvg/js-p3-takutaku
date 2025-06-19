import { createContext, useContext, useState } from "react";

// Typage des données du context
export type Users = {
  id: number;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  is_admin: boolean;
  is_actif: boolean;
};

// Typage du context User
type UserContextType = {
  user: Users | null;
  setUser: React.Dispatch<React.SetStateAction<Users | null>>;
  createUser: (newUser: Omit<Users, "id">) => Promise<void>;
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUser: () => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  handleLogin: (user: Users) => Promise<void>;
  updateUser: (id: number, updateData: Partial<Users>) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [user, setUser] = useState<Users | null>(null);

  const fetchUser = (): Promise<void> => {
    return fetch("http://localhost:3310/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  };

  //Fonction qui gère la création de compte utilisateur

  const createUser = async (newUser: Omit<Users, "id">): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3310/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const createdUser = await response.json();
      setUser(createdUser);
      setConnected(true);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  };

  // Fonction qui gère la connexion de l'utilisateur
  const handleLogin = async (loginUser: {
    mail: string;
    password: string;
  }): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3310/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }

      const data = await response.json();

      setUser(data);
      setConnected(true);
    } catch (error) {
      console.error(error);
      setConnected(false);
    }
  };

  // Fonction pour la mise à jour de la base de donnée des utilisateurs pour la page Admin
  const updateUser = async (
    id: number,
    updateData: Partial<Users>,
  ): Promise<void> => {
    const response = await fetch(`http://localhost:3310/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error("Echec de la mise à jour de l'utilisateur");
    }
    await fetchUser();
  };

  // Fonction pour la suppression de la base de donnée des utilisateurs pour la page Admin
  const deleteUser = async (id: number): Promise<void> => {
    const response = await fetch(`http://localhost:3310/api/user/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("La suppression a échoué côté serveur");
    }

    console.info("Utilisateur supprimé avec succès");
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
        handleLogin,
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
