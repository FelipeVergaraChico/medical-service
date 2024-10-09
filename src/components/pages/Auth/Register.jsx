import { Context } from "../../../context/UserContext";
import { VerifyUser } from "../../../hooks/VerifyUser";
import Input from "../../form/Input";
import Select from "../../form/Select";
import styles from "./Login.module.css";
import { useState, useContext, useEffect } from "react";

export default function Register() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token") || "";
  const { register } = useContext(Context);
  const { verifyUserAdmin } = VerifyUser();

  useEffect(() => {
    verifyUserAdmin(token);
  }, [token]);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // post register
    register(token, user);
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.h1}>Registrar Usuario</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu Nome"
          handleOnChange={handleChange}
        />
        <Input
          text="CPF/CNPJ"
          type="text"
          name="cpfCnpj"
          placeholder="Digite seu CPF/CNPJ"
          handleOnChange={handleChange}
        />
        <Input
          text="Cidade"
          type="text"
          name="city"
          placeholder="Digite sua cidade"
          handleOnChange={handleChange}
        />

        <Select
          name="position"
          text="Selecione o cargo"
          options={["Member", "Admin"]}
          handleOnChange={handleChange}
          value={user.position || ""}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Registrar" />
      </form>
    </section>
  );
}
