import Carousel from "../components/home/Carousel";

function Home() {
  return (
    <>
      <Carousel />
      <section className="text-white py-12 px-4 lg:py-20 ">
        <h2 className="text-3xl font-bold text-center mb-10 lg:mb-20">
          Abonnement
        </h2>
        <section className="grid grid-cols-2 gap-3 lg:gap-40 max-w-4xl mx-auto">
          {/* Offre Découverte */}
          <section className="border-5 border-secondary p-4 flex flex-col justify-between shadow-lg">
            <section>
              <h3 className="text-xl font-bold mb-4 mt-4 lg:mb-20 text-center">
                Offre Découverte
              </h3>
              <p className="font-semibold lg:ml-5">
                2 mois offert <br />
                puis <span className="text-secondary">10.99€</span> par mois
              </p>
              <ul className="mt-4 lg:ml-4 space-y-2 text-sm">
                <li>• Accès complet au catalogue</li>
                <li>• Avec publicité</li>
                <li>
                  • Qualité vidéo jusqu’à <strong>720p</strong>
                </li>
                <li>• 1 écran à la fois</li>
              </ul>
              <p className="mt-21 lg:mt-16 text-sm font-semibold text-white text-center">
                Parfait pour découvrir nos animés sans engagement !
              </p>
              <section className="flex justify-center mt-6 ">
                <button
                  type="button"
                  className="mt-4  bg-secondary text-black py-1 px-7 lg:px-15 rounded-full"
                >
                  S'abonner
                </button>
              </section>
            </section>
          </section>

          {/* Offre Premium */}
          <section className="border-5 border-secondary p-4 flex flex-col justify-between shadow-lg">
            <section>
              <h3 className="text-xl font-bold mb-4 mt-4 lg:mb-15 text-center">
                Offre Premium
                <br />
                “Sans Pub”
              </h3>
              <p className="text-secondary font-semibold mb-10 lg:ml-5 lg:mb-4">
                Prix : <span className="text-secondary">20.99 €/mois</span>
              </p>
              <ul className="mt-4 lg:ml-4 space-y-2 text-sm">
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
              <p className="mt-9 lg:mt-13 text-sm font-semibold text-white text-center">
                Pour les vrais fans qui veulent profiter sans interruption !
              </p>
              <section className="flex justify-center mt-6 mb-3">
                <button
                  type="button"
                  className="mt-4 bg-secondary text-black py-1 px-7 lg:px-15 rounded-full"
                >
                  S'abonner
                </button>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}

export default Home;
