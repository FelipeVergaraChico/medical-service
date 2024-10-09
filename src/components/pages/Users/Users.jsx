import { useEffect, useState } from "react";
import { VerifyUser } from "../../../hooks/VerifyUser";
import styles from "./Users.module.css";
import apiInstance from "../../../utils/api";
import { Link } from "react-router-dom";

export default function Users() {
  const [ users, setUsers ] = useState([])
  const { verifyUser, user, setUser, verifyUserAdmin } = VerifyUser();
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    verifyUser(token);
    verifyUserAdmin(token);
    setUser(user);
  }, [token, VerifyUser]);

  useEffect(() => {
    if (user && user._id) {
      getUsers();
    }
  }, [user]);

  const getUsers = async () => {
    
    if (!user) return; // Evita que a requisição seja feita se user ainda não foi carregado

    try {
      const response = await apiInstance.get(`users/getall`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      let array = response;
      
      setUsers(array.data);
    } catch (err) {
      
      console.error("Erro ao buscar usuarios:", err);
    }
  };

  return (
    <section className={styles.container}>
        <h1 className={styles.title}>Usuários:</h1>

        {users.map((user, index) => (
            <div key={index} className={styles.user}>
                <h2>{user.name}</h2>
                <p>{user.cpfCnpj}</p>
                <p>{user.city}</p>
                <button className={styles.button}>
                    <Link to={`${user._id}`}>Ver ors</Link>
                </button>
            </div>
        ))}
    </section>
  )
}
