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
      <h1 className={styles.homeTitle}>Home</h1>
      {user && <p className={styles.welcomeMessage}>Bem-vindo, {user.name}</p>}
      
      {user ? (
        <>
          {user.position === "Admin" ? (
            <div className={styles.adminPanel}>
              <h2>Admin Painel</h2>
              <p>Aqui estão as ferramentas administrativas.</p>
              {/* Renderizar componentes ou botões exclusivos para admins */}
              <button className={styles.button}><Link to="/register">Registrar usuários</Link></button>
              <button className={styles.button}><Link to="/users">Usuarios registrados</Link></button>
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
