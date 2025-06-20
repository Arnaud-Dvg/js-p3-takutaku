import { useState } from "react";
import { useUserContext } from "../../../context/UserContext";

interface CreateAccountProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
}

function createAccount({
  isOpen,
  onClose,
  selectedPlan,
  setSelectedPlan,
}: CreateAccountProps) {
  if (!isOpen) return null;
  const abonnementMap: Record<string, number> = {
    Découverte: 1,
    Premium: 2,
  };

  const { createUser } = useUserContext();

  const [newaccount, setNewAccount] = useState({
    firstname: "",
    lastname: "",
    mail: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const abonnement_id = abonnementMap[selectedPlan];

    if (!abonnement_id) {
      return;
    }

    const userToCreate = {
      ...newaccount,
      is_admin: false,
      is_actif: true,
      abonnement_id,
    };

    await createUser(userToCreate);
    onClose();
    setNewAccount({
      firstname: "",
      lastname: "",
      mail: "",
      password: "",
    });
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
      <section className="relative bg-black text-white rounded-lg w-full max-w-lg p-8">
        {/* Logo */}
        <section className="text-center mb-10">
          <img
            src="/logo_taku.png"
            alt="Logo TakuTaku"
            className="mx-auto h-15"
          />
        </section>

        <h2 className="text-2xl text-center mb-6">Création de compte</h2>
        {/* Formulaire de création de compte */}
        <form
          className="flex flex-col space-y-3 text-sm"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            value={newaccount.lastname}
            onChange={handleChange}
            required
            className="bg-black border-b border-gray-500 py-1 px-2 placeholder-white focus:outline-none"
          />
          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            value={newaccount.firstname}
            onChange={handleChange}
            required
            className="bg-black border-b border-gray-500 py-1 px-2 placeholder-white focus:outline-none"
          />
          <input
            type="email"
            name="mail"
            placeholder="Adresse e-mail"
            value={newaccount.mail}
            onChange={handleChange}
            required
            className="bg-black border-b border-gray-500 py-1 px-2 placeholder-white focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={newaccount.password}
            onChange={handleChange}
            required
            className="bg-black border-b border-gray-500 py-1 px-2 placeholder-white focus:outline-none"
          />

          {/* Choix d'abonnement */}
          <section className="mt-2 mr-2">
            <p className=" mb-1">Abonnement</p>
            <section className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="plan"
                  value="Découverte"
                  checked={selectedPlan === "Découverte"}
                  onChange={() => setSelectedPlan("Découverte")}
                  className="mr-2"
                />
                Découverte
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="plan"
                  value="Premium"
                  checked={selectedPlan === "Premium"}
                  onChange={() => setSelectedPlan("Premium")}
                  className="mr-2"
                />
                Premium
              </label>
            </section>
          </section>

          <button
            type="submit"
            className="mt-4 w-full border border-white text-white py-2 rounded-full hover:bg-secondary hover:text-black transition"
          >
            Valider
          </button>
        </form>

        {/* Mascotte */}
        <section className="flex justify-between items-end mt-4">
          <img src="/favicon.ico" alt="Mascotte" className="h-15" />
        </section>
        {/* Bouton fermer */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-400 text-xl hover:text-white"
        >
          &times;
        </button>
      </section>
    </section>
  );
}

export default createAccount;
