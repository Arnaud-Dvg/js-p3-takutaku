interface SignupPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
}

function SignupPopup({
  isOpen,
  onClose,
  selectedPlan,
  setSelectedPlan,
}: SignupPopupProps) {
  if (!isOpen) return null;

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

        <h2 className="text-2xl font-semibold text-center mb-6">
          Création de compte
        </h2>

        <form className="flex flex-col space-y-3 text-sm">
          <input
            type="text"
            placeholder="Nom d’utilisateur"
            className="bg-black border-b border-gray-500 py-1 px-2 placeholder-white focus:outline-none"
          />
          <input
            type="email"
            placeholder="Adresse e-mail"
            className="bg-black border-b border-gray-500 py-1 px-2 placeholder-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Mot de passe"
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

export default SignupPopup;
