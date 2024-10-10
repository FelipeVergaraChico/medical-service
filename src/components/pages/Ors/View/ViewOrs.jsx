import { useEffect, useState } from "react";
import { VerifyUser } from "../../../../hooks/VerifyUser";
import styles from "./ViewOrs.module.css";


import apiInstance from "../../../../utils/api";

import SearchComponent from "../../../SearchBar/SearchBar";
import Ors from "./Ors/Ors";

export default function ViewOrs() {
  const [ors, setOrs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const token = localStorage.getItem("token") || "";
  const { verifyUser, user } = VerifyUser();


  // Primeira execução para verificar o usuário
  useEffect(() => {
    verifyUser(token);
  }, [token]);

  // Segunda execução para buscar as ORs quando o usuário estiver carregado
  useEffect(() => {
    if (user && user._id) {
      getOrs();
    }
  }, [user, page]); // Agora depende apenas do user quando ele estiver pronto e da página

  const getOrs = async () => {
    
    if (!user) return; // Evita que a requisição seja feita se user ainda não foi carregado

    try {
      const response = await apiInstance.get(`ors/myors`, {
        params: {
          page: page,
          limit: limit,
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      let array = response.data.ors.ors;
      setOrs(array);
      setTotalPages(response.data.ors.totalPages);
    } catch (err) {
      
      console.error("Erro ao buscar publicações:", err);
    }
  };

  // Funções para mudar de página
  function previousPage() {
    if (page > 1) setPage(page - 1);
  }

  function nextPage() {
    if (page < totalPages) setPage(page + 1);
  }

  return (
    <section className={styles.container}>
      <SearchComponent setOrs={setOrs} setTotalPages={setTotalPages} />
      <Ors
        previousPage={previousPage}
        nextPage={nextPage}
        ors={ors}
        page={page}
        totalPages={totalPages}
      />
      <div className={styles.divButtons}>
        <button
          onClick={previousPage}
          disabled={page === 1}
          className={styles.button}
        >
          Página Anterior
        </button>
        <span>
          {" "}
          Página {page} de {totalPages}{" "}
        </span>
        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className={styles.button}
        >
          Próxima Página
        </button>
      </div>
    </section>
  );
}
