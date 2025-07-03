import { useState } from "react";
import type { User } from "../../../context/UserContext";
import { useUserContext } from "../../../context/UserContext";
import CreateAccount from "./CreateAccount";

function Abonnement() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const { user } = useUserContext() as { user: User | null };

  const handleSubscribeClick = (plan: string) => {
    setSelectedPlan(plan); // Met à jour l'offre choisie
    setIsSignupOpen(true);
  };

  const handleCloseSignup = () => {
    setIsSignupOpen(false);
    setSelectedPlan(""); // Réinitialiser si nécessaire
  };

  return (
    <>
      <section className="grid grid-cols-2 gap-3 md:gap-30 lg:gap-40 xl:gap-60 xxl:gap-80 max-w-4xl mx-auto md:mx-14 lg:mx-auto text-tertiary">
        {/* Offre Découverte */}
        <section className="border-5 border-secondary p-4 flex flex-col justify-between shadow-lg">
          <section>
            <h3 className="text-lg lg:text-xl mb-4 mt-2 md:mt-4 md:mb-10 lg:mb-16 text-center">
              Offre Découverte
            </h3>
            <section className="md:ml-4">
              <p className="font-semibold lg:ml-5 lg:mb-4 md:mb-6 mb-8">
                2 mois offert <br />
                puis <span className="text-secondary">10.99€</span> par mois
              </p>
              <ul className="mt-4 md:mb-8 lg:ml-4 space-y-2 text-sm">
                <li>• Accès complet au catalogue</li>
                <li>• Avec publicité</li>
                <li>
                  • Qualité vidéo jusqu’à <strong>720p</strong>
                </li>
                <li>• 1 écran à la fois</li>
              </ul>
            </section>
            <section>
              <p className="mt-21 lg:mt-16 text-sm font-semibold text-tertiary text-center">
                Parfait pour découvrir nos animés sans engagement !
              </p>
              <section className="flex justify-center mt-6 ">
                <button
                  type="button"
                  onClick={() => handleSubscribeClick("Découverte")}
                  className={`mt-4  bg-secondary text-black py-1 px-7 lg:px-15 rounded-full ${user?.abonnement_id === 1 ? "hidden" : ""}`}
                >
                  S'abonner
                </button>
              </section>
            </section>
          </section>
        </section>

        {/* Offre Premium */}
        <section className="border-5 border-secondary p-4 flex flex-col justify-between shadow-lg">
          <section>
            <h3 className="text-lg lg:text-xl mb-4 mt-2 md:mt-4 md:mb-5 lg:mb-10 text-center">
              Offre Premium
              <br />
              “Sans Pub”
            </h3>
            <section className="md:ml-4 lg:mb-4">
              <p className="font-semibold mb-4 lg:ml-5 lg:mb-4 md:mb-6">
                Prix : <span className="text-secondary">20.99€ </span> par mois
              </p>
              <ul className="mt-14 md:mt-8 lg:ml-4 space-y-2 text-sm">
                <li>• Accès complet au catalogue</li>
                <li>
                  • <span className="text-secondary">Sans publicité</span>
                </li>
                <li>
                  • Qualité vidéo jusqu’à{" "}
                  <span className="text-secondary">1080p</span>
                </li>
                <li>
                  • <span className="text-secondary">2</span> écrans à la fois
                </li>
                <li>
                  •{" "}
                  <span className="font-semibold text-secondary">
                    Téléchargement hors ligne
                  </span>
                </li>
              </ul>
            </section>
            <section>
              <p className="mt-9 md:mt-12 lg:mt-8 text-sm font-semibold text-tertiary text-center">
                Pour les vrais fans qui veulent profiter sans interruption !
              </p>
              <section className="flex justify-center mt-6 mb-3">
                <button
                  type="button"
                  onClick={() => handleSubscribeClick("Premium")}
                  className={`mt-4 bg-secondary text-black py-1 px-7 lg:px-15 rounded-full ${user?.abonnement_id === 2 ? "hidden" : ""}`}
                >
                  S'abonner
                </button>
              </section>
            </section>
          </section>
        </section>
      </section>
      {/* Popup avec props complètes */}
      <CreateAccount
        isOpen={isSignupOpen}
        onClose={handleCloseSignup}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />
    </>
  );
}

export default Abonnement;
