import { useState, useContext } from "react";
import styles from "./Login.module.css";

/* Context */
import { Context } from "../../../context/UserContext.jsx";
import Input from "../../form/Input.jsx";

export default function Login(){
    const [ user, setUser ] = useState({})
    const { login } = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()

        // post login
        login(user)
    }

    return (
        <section className={styles.section}>
                <h1 className={styles.h1}>Login</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input
                        text="CPF"
                        type="text"
                        name="cpfCnpj"
                        placeholder="Digite seu CPF"
                        handleOnChange={handleChange}
                    />
                    <Input
                        text="Senha"
                        type="password"
                        name="password"
                        placeholder="Digite sua senha"
                        handleOnChange={handleChange}
                    />
                    <input type="submit" value="Login" />
                </form>
        </section>
    )
}
