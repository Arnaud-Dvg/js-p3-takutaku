import { Link } from "react-router";
import { useState } from "react";
import emailjs from "emailjs-com";
import { useRef } from "react";

function Footer() {
  const [open, setOpen] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    setLoading(true);

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        (result) => {
          console.log(result.text);
          alert("Votre message a bien été envoyé !");
          form.current?.reset();
        },
        (error) => {
          console.log(error.text);
          alert("Une erreur est survenue, veuillez réessayer plus tard.");
        },
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="m-10 text-white container mx-auto px-4 py-4 flex flex-row justify-between items-center">
      {/* Gauche */}
      <section className="text-sm mb-4 lg:mb-0">© 2025 TakuTaku</section>

      {/* Centre */}
      <section className="text-center text-sm space-y-1">
        <section>
          <Link to="/CGV">CGV</Link>
        </section>
        <section>
          <Link to="/mentions">Mentions légales</Link>
        </section>
        <section>
          <Link to="/contact">A propos de TakuTaku</Link>
        </section>

        <section>
          <p>
            contact@takutaku.fr -
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="underline hover:text-secondary cursor-pointer"
            >
              Nous contacter
            </button>
          </p>
        </section>
      </section>

      {/* Droite : image */}
      <section className="mt-4">
        <img
          src="/public/favicon.ico"
          alt="Mascotte TakuTaku"
          className="h-20 w-auto"
        />
      </section>

      {open && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
          <section className="relative bg-black text-white rounded-lg w-full max-w-lg p-8">
            {/* Logo TakuTaku */}
            <section className="text-center mb-6">
              <img
                src="/logo-taku.png"
                alt="Logo TakuTaku"
                className="mx-auto h-10"
              />
            </section>

            {/* Titre */}
            <h2 className="text-2xl font-semibold text-center mb-6">
              Nous contacter
            </h2>

            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-2">
              {/* Nom / Prénom */}
              <section className="flex gap-4">
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  required
                  className="w-1/2 bg-black border border-white text-white px-4 py-2 rounded-full text-sm"
                />
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  required
                  className="w-1/2 bg-black border border-white text-white px-4 py-2 rounded-full text-sm"
                />
              </section>

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                required
                className="w-full bg-black border border-white text-white px-4 py-2 rounded-full text-sm"
              />

              {/* Objet */}
              <input
                type="text"
                name="objet"
                placeholder="Objet"
                required
                className="w-full bg-black border border-white text-white px-4 py-2 rounded-full text-sm"
              />

              {/* Message */}
              <textarea
                name="message"
                placeholder="Message"
                required
                rows={10}
                className="w-full bg-black border border-white text-white px-4 py-2 rounded-2xl  text-sm"
              />

              {/* Mascotte + Bouton envoyer */}
              <section className="flex justify-between items-end mt-4">
                <img src="/favicon.ico" alt="Mascotte" className="h-15" />
                <button
                  type="submit"
                    disabled={loading}
                  className="text-secondary font-bold text-lg hover:text-secondary pb-10 "
                >
                  {loading ? "Envoi en cours..." : "Envoyer"}
                </button>
              </section>
            </form>

            {/* Bouton fermer */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-white text-xl font-bold"
            >
              &times;
            </button>
          </section>
        </section>
      )}
    </section>
  );
}

export default Footer;
