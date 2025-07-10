import { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../context/AuthContext";
import { useUserContext } from "../../../context/UserContext";

interface PaymentPopUpProps {
  newaccount: {
    firstname: string;
    lastname: string;
    mail: string;
    password: string;
  };
  selectedPlan: string;
  email: string;
  onClose: () => void;
}

const PaymentPopUp: React.FC<PaymentPopUpProps> = ({
  newaccount,
  selectedPlan,
  email,
  onClose,
}) => {
  const { connected } = useAuthContext();
  const { user, createUser, updateUser } = useUserContext();

  const abonnementMap: Record<string, number> = {
    Découverte: 1,
    Premium: 2,
  };

  const [formData, setFormData] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });

  const handleCreateAccount = async () => {
    const abonnement_id = abonnementMap[selectedPlan];
    if (!abonnement_id) return;

    const userToCreate = {
      ...newaccount,
      is_admin: false,
      is_actif: true,
      abonnement_id,
      profil_picture_id: 1,
      token: "",
    };

    await createUser(userToCreate);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // --- CARD NUMBER ---
    if (name === "cardNumber") {
      // Vérifier s'il y a des lettres
      const hasLetters = /[a-zA-Z]/.test(value);
      if (hasLetters) {
        toast.error(
          "Les lettres ne sont pas autorisées dans le numéro de carte.",
        );
      }

      // Supprimer tout sauf les chiffres
      const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
      const parts = digitsOnly.match(/.{1,4}/g);
      formattedValue = parts ? parts.join("-") : "";
    }

    // --- NAME ON CARD ---
    if (name === "nameOnCard") {
      const cleaned = value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");

      if (cleaned.length < value.length) {
        toast.error("Seules les lettres sont autorisées dans le nom.");
      }

      formattedValue = cleaned;
    }

    // --- EXPIRY DATE ---
    if (name === "expiry") {
      // Vérifier si la valeur contient des lettres
      const hasLetters = /[a-zA-Z]/.test(value);
      if (hasLetters) {
        toast.error(
          "Les lettres ne sont pas autorisées dans la date d'expiration.",
        );
      }
      // Supprimer tout sauf les chiffres et le slash
      const digitsOnly = value.replace(/[^0-9/]/g, "").slice(0, 5);
      // Formater en MM/AA
      const digits = digitsOnly.split("/");
      formattedValue = digits.slice(0, 2).join("/");
    }
    // --- CVV ---
    if (name === "cvv") {
      // Vérifier si la valeur contient des lettres
      const hasLetters = /[a-zA-Z]/.test(value);
      if (hasLetters) {
        toast.error("Les lettres ne sont pas autorisées dans le CVV.");
      }
      // Supprimer tout sauf les chiffres
      const digitsOnly = value.replace(/\D/g, "").slice(0, 3);
      // Formater en 3 chiffres
      formattedValue = digitsOnly;
    }
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { cardNumber, nameOnCard, expiry, cvv } = formData;

    if (!cardNumber || !nameOnCard || !expiry || !cvv) {
      toast.error("Tous les champs sont obligatoires.");
      return;
    }

    // Supprimer les tirets pour validation brute
    const rawCardNumber = cardNumber.replace(/\D/g, "");
    if (rawCardNumber.length !== 16) {
      toast.error("Le numéro de carte doit contenir 16 chiffres.");
      return;
    }

    if (!/^[A-Za-zÀ-ÿ\s'-]{2,}$/.test(nameOnCard.trim())) {
      toast.error("Nom invalide.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      toast.error("Date d’expiration invalide (MM/AA).");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      toast.error("CVV invalide.");
      return;
    }

    // Si l'utilisateur n'est pas connecté, on crée le compte
    if (!connected) {
      handleCreateAccount();
    }

    // Si l'utilisateur est connecté, on peut procéder au paiement et switcher l'abonnement
    if (connected && user) {
      const updatedUser = {
        ...user,
        abonnement_id: selectedPlan === "Découverte" ? 1 : 2,
      };
      await updateUser(user.id, updatedUser);
      localStorage.setItem("userConnected", JSON.stringify(updatedUser));
    }

    // Tout est OK
    toast.success("Paiement effectué avec succès !");
    onClose();
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-primary bg-opacity-70 px-4">
      <section className="relative bg-primary text-tertiary rounded-lg w-full max-w-lg p-8">
        {/* Logo */}
        <section className="text-center mb-10">
          <img
            src="/logo_taku.png"
            alt="Logo TakuTaku"
            className="mx-auto h-15"
          />
        </section>

        <section className="text-sm mb-6 space-y-1">
          <p>
            <strong>Plan choisi :</strong> {selectedPlan}
          </p>
          <p>
            <strong>Email :</strong> {email}
          </p>
        </section>

        <form className="space-y-4 text-primary" onSubmit={handlePayment}>
          <section className="flex items-center bg-tertiary rounded px-3 py-2">
            <FaCreditCard className="text-gray-500 mr-2" />
            <input
              type="text"
              name="cardNumber"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="Numéro de carte"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength={19}
              minLength={19}
              className="w-full outline-none bg-transparent"
            />
          </section>

          <input
            type="text"
            name="nameOnCard"
            placeholder="Nom sur la carte"
            value={formData.nameOnCard}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-tertiary outline-none"
          />

          <section className="flex gap-4">
            <input
              type="text"
              name="expiry"
              placeholder="MM/AA"
              value={formData.expiry}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 rounded bg-tertiary outline-none"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 rounded bg-tertiary outline-none"
            />
          </section>

          <button
            type="submit"
            className="mt-4 w-full border border-tertiary text-tertiary py-2 rounded-full hover:bg-secondary hover:text-black transition"
          >
            Valider le paiement
          </button>
        </form>

        {/* Mascotte */}
        <section className="flex justify-between items-end mt-4">
          <img src="/favicon.ico" alt="Mascotte" className="h-15" />
        </section>
        {/* Bouton fermer */}
        <button
          type="button"
          onClick={() => {
            onClose();
            toast.error(
              "Echec lors du paiement, le compte n'a pas pu être créé.",
            );
          }}
          className="absolute top-2 right-4 text-gray-400 text-xl hover:text-tertiary"
        >
          &times;
        </button>
      </section>
    </section>
  );
};

export default PaymentPopUp;
