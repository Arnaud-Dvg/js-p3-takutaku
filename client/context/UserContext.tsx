import { createContext, useContext, useEffect, useState } from "react";

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
};
export type Login = {
  mail: string;
  password: string;
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
  handleLogin: (user: Login) => Promise<void>;
  updateUser: (id: number, updateData: Partial<User>) => Promise<void>;
  handleLogOut: () => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (): Promise<void> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user`);
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Erreur lors du fetch utilisateur :", error);
    }
  };

  //Fonction qui gère la création de compte utilisateur
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
  const handleLogin = async ({ mail, password }: Login) => {
    try {
      const response = await fetch("http://localhost:3310/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, password }),
      });

      if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }

      const data = await response.json();

      // Crée un utilisateur minimal pour le context
      const formattedUser: User = {
        id: data.userId, // récupéré depuis l’API
        firstname: "", // à compléter si dispo
        lastname: "",
        mail, // on garde le mail utilisé pour se connecter
        password: "", // à éviter de garder en vrai, mais requis par le type
        is_admin: false,
        is_actif: true,
        abonnement_id: 0,
      };

      setUser(formattedUser);
      localStorage.setItem(
        "Utilisateur connecté",
        JSON.stringify(formattedUser),
      );
      console.log("🔐 Login réussi :", formattedUser);
      setConnected(true);
    } catch (error) {
      console.error("❌ Erreur login :", error);
      setConnected(false);
    }
  };

  const handleLogOut = () => {
    setUser(null);
    setConnected(false);
    localStorage.removeItem("Utilisateur connecté");
    localStorage.setItem("connected", "false");
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
        },
        body: JSON.stringify(updateData),
      },
    );
    if (!response.ok) {
      throw new Error("Echec de la mise à jour de l'utilisateur");
    }
    await fetchUser();
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

  useEffect(() => {
    const storedUser = localStorage.getItem("Utilisateur connecté"); // je récupère les données utilisateur dans la variable storeUser

    if (storedUser) {
      //si je trouve quelque chose
      try {
        const parsedUser = JSON.parse(storedUser); //je transforme la chaine JSON(format de la donée du local storage) en objet JS utilisable

        if (parsedUser?.id) {
          // je vérifie que cet objet JS détient un ID
          setUser(parsedUser); // je met à jour l'objet récupéré
          setConnected(true); //je déclare l'utilisateur connecté
          console.log(
            "🔁 Données chargées depuis le localStorage :",
            parsedUser,
          ); //j'affiche dans la console que tout a été chargé depuis le local storage
        } else {
          console.warn("❗ Format utilisateur invalide dans le localStorage"); // alerte pour aider à debug
        }
      } catch (error) {
        console.error("❌ Erreur parsing localStorage :", error); //idem
      }
    }

    setLoading(false); // j'arrête le chargement peu importe s'il y a eu un utilisateur de trouvé ou pas.
  }, []);

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
        handleLogOut,
        loading,
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
