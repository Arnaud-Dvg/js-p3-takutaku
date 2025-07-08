import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import CreateAccount from "../components/home/CreateAccount";

function LogIn() {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const navigate = useNavigate();

  const { handleLogin } = useAuthContext();

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await handleLogin({ mail, password });
      navigate("/"); // redirection ici
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  const handleCloseSignup = () => {
    setIsSignupOpen(false);
    setSelectedPlan("");
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
      <section className="relative bg-black text-white rounded-lg w-full max-w-lg p-8">
        <h1 className="text-center text-2xl mb-25">Connexion</h1>

        <form onSubmit={handleClick}>
          <input
            type="email"
            value={mail}
            placeholder="Adresse e-mail"
            required
            onChange={(e) => setMail(e.target.value)}
            className="border-b border-white bg-transparent py-2 mb-6 text-white placeholder-white focus:outline-none w-full"
          />

          <input
            type="password"
            value={password}
            placeholder="Mot de passe"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-white bg-transparent py-2 mb-6 text-white placeholder-white focus:outline-none w-full"
          />

          <button
            type="submit"
            className="border border-white text-white my-10 py-2 rounded-full w-full mb-6 hover:bg-secondary hover:text-black transition"
          >
            Se connecter
          </button>
        </form>

        <div className="w-full flex justify-end mb-6">
          <button
            type="button"
            onClick={() => setIsSignupOpen(true)}
            className="text-yellow-400 font-semibold hover:text-yellow-300 my-5"
          >
            Créer un compte
          </button>
        </div>

        <div className="flex justify-between items-end mt-4">
          <img src="/favicon.ico" alt="Mascotte" className="h-15" />
        </div>

        {/* Bouton fermer */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-2 right-4 text-gray-400 text-xl hover:text-tertiary"
        >
          &times;
        </button>

        {isSignupOpen && (
          <CreateAccount
            isOpen={isSignupOpen}
            onClose={handleCloseSignup}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        )}
      </section>
    </section>
  );
}

export default LogIn;
