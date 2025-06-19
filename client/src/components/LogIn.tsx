import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../context/UserContext";

function LogIn() {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { handleLogin, connected } = useUserContext(); // je récupère la fonction handleLogin, et le state "connecté" du context

  const handleClick = (e: React.FormEvent) => {
    //ici je crée une fonction handleclick a insérer dans mon formulaire
    e.preventDefault();
    handleLogin({ mail, password }); // la je récupère l'objet mail et mdp de la fonction handleLogin
  };
  const navigate = useNavigate(); // je crée une variable qui prend la fonction useNavigate

  useEffect(() => {
    //j'utilise useEffect parce que le state connecté est une valeur qui peut changer (asynchrone)
    if (connected) {
      navigate("/");
    }
  }, [connected, navigate]);

  return (
    <>
      <form onSubmit={handleClick}>
        <section className=" flex flex-col items-center justify-center">
          <section className="my-5">
            <input
              type="email"
              value={mail}
              placeholder="E-mail"
              required
              onChange={(e) => setMail(e.target.value)}
              className="w-full border-b border-white text-white px-4 py-2 text-sm"
            />
          </section>
          <section>
            <input
              type="password"
              value={password}
              placeholder="Mot de Passe"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b border-white text-white px-4 py-2 text-sm"
            />
          </section>
          <button
            type="submit"
            className="text-secondary font-bold text-lg hover:text-secondary py-5"
          >
            Connexion
          </button>
          <section className="flex justify-start w-full">
            <img src="/favicon.ico" alt="Mascotte" className="h-15" />
          </section>
        </section>
      </form>
    </>
  );
}

export default LogIn;
