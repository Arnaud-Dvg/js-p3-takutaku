import { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface PaymentPopUpProps {
  selectedPlan: string;
  email: string;
  onClose: () => void;
}

const PaymentPopUp: React.FC<PaymentPopUpProps> = ({
  selectedPlan,
  email,
  onClose,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });

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

  const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
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

    // Tout est OK
    toast.success("Paiement effectué avec succès !");
    onClose();
    navigate("/");
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

        <section className="text-sm mb-6 space-y-1">
          <p>
            <strong>Plan choisi :</strong> {selectedPlan}
          </p>
          <p>
            <strong>Email :</strong> {email}
          </p>
        </section>

        <form className="space-y-4 text-black" onSubmit={handlePayment}>
          <section className="flex items-center bg-white rounded px-3 py-2">
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
            className="w-full px-3 py-2 rounded bg-white outline-none"
          />

          <section className="flex gap-4">
            <input
              type="text"
              name="expiry"
              placeholder="MM/AA"
              value={formData.expiry}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 rounded bg-white outline-none"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 rounded bg-white outline-none"
            />
          </section>

          <button
            type="submit"
            className="mt-4 w-full border border-white text-white py-2 rounded-full hover:bg-secondary hover:text-black transition"
          >
            Valider le paiement
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-400 text-xl hover:text-white"
        >
          &times;
        </button>
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
};

export default PaymentPopUp;
