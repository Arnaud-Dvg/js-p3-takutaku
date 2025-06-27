import { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    // Simulation
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

        <form className="space-y-4 text-black">
          <section className="flex items-center bg-white rounded px-3 py-2">
            <FaCreditCard className="text-gray-500 mr-2" />
            <input
              type="text"
              name="cardNumber"
              placeholder="Numéro de carte"
              value={formData.cardNumber}
              onChange={handleChange}
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
            type="button"
            onClick={handlePayment}
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
