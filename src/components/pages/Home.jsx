import { useEffect } from "react";
import styles from "./Home.module.css";
import { VerifyUser } from "../../hooks/VerifyUser";
import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token") || "";
  const { verifyUser, user, setUser } = VerifyUser()

  useEffect(() => {
    verifyUser(token)
    setUser(user)
  }, [token, VerifyUser]);

  return (
    <div>
      <h1 className={styles.homeTitle}>Inicio</h1>
      {user && <p className={styles.welcomeMessage}>Bem-vindo, {user.name}</p>}
      
      {user ? (
        <>
          {user.position === "Admin" ? (
            <div className={styles.adminPanel}>
              <h2>Painel do Administrador</h2>
              <p>Aqui estão as ferramentas administrativas.</p>
              {/* Renderizar componentes ou botões exclusivos para admins */}
              <div className={styles.buttons}>
                <Link to="/register" className={styles.button}>Registrar usuários</Link>
                <Link to="/users" className={styles.button}>Usuarios registrados</Link>
              </div>
            </div>
          ) : (
            <p className={styles.permissionMessage}>Você não tem permissão para acessar o painel de admin.</p>
          )}
        </>
      ) : (
        <p className={styles.loadingMessage}>Carregando...</p>
      )}
    </div>
  );
}
