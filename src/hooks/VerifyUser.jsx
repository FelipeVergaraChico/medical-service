import apiInstance from "../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const VerifyUser = () => {
  const [ user, setUser ] = useState(null)
  const navigate = useNavigate();
  
  async function verifyUser(token) {
    if (!token) {
      navigate("/login");
      return;
    }

    await apiInstance
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,  // Token sem JSON.parse()
        },
      })
      .then((response) => {
        setUser(response.data.response)  // Armazena os dados do usuário
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error.response?.data || error.message);
        navigate("/login");  // Redireciona para login em caso de erro
      });
      
  }

  async function verifyUserAdmin(token){
    if (!token) {
      navigate("/login");
      return;
    }

    await apiInstance
      .get("/users/checkuserAdmin", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,  // Token sem JSON.parse()
        },
      })
      .then((response) => {
        setUser(response.data.response)  // Armazena os dados do usuário
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do admin:", error.response?.data || error.message);
        navigate("/");  // Redireciona para login em caso de erro
      });
  }

  async function verifyOrsUser(idOrs, token){
    if (!token) {
      navigate("/login");
      return;
    }

    await apiInstance
      .get(`/users/checkOrsUser/${idOrs}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,  // Token sem JSON.parse()
        },
      })
      .then((response) => {
        setUser(response.data.response)  // Armazena os dados do usuário
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do admin:", error.response?.data || error.message);
        navigate("/");  // Redireciona para login em caso de erro
      });
  }
  

  return { verifyUser, verifyUserAdmin, verifyOrsUser, user, setUser };  // Retorna a função de verificação e os dados do usuário
};
