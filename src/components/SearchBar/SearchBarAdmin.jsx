/* eslint-disable react/prop-types */
import { useState } from 'react';
import apiInstance from '../../utils/api';
import useFlashMessage from "../../hooks/useFlashMessage";

import styles from "./SearchBar.module.css";

const SearchComponent = ({setOrs, setTotalPages, idUserParams}) => {
  const token = localStorage.getItem("token") || "";
  // Estados para os filtros e resultados
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [startDate, setStartDate] = useState('');
  const { setFlashMessage } = useFlashMessage();
  // Função para realizar a busca
  const fetchData = async (e) => {
    e.preventDefault()

    let msgText = "Dados encontrados:"
    let msgType = "success"

    try { // Supondo que o token esteja no localStorage
      const response = await apiInstance.get('/ors/searchadmin', {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        params: {
          client,
          status,
          searchAddress,
          startDate,
          idUser: idUserParams
        }
      });
      setOrs(response.data.ors)
      setTotalPages(1) // Reseta a página para mostrar os resultados da busca
    } catch (error) {
      msgText = "Dados não encontrados"
      msgType = "error"
      console.error('Erro ao buscar dados:', error);
    }

    setFlashMessage(msgText, msgType)
  };

  return (
    <div>
      <h2>Buscar Dados</h2>
      {/* Inputs para os filtros */}
      <form onSubmit={fetchData} className={styles.form}>
        <div>
            <label>Cliente: </label>
            <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Nome do cliente"
            />
        </div>
        <div>
            <label>Status: </label>
            <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Status"
            />
        </div>
        <div>
            <label>Endereço: </label>
            <input
            type="text"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            placeholder="Endereço"
            />
        </div>
        <div>
            <label>Data de entrega: </label>
            <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            />
        </div>
        
        {/* Botão para buscar (opcional) */}
        <button type="submit" onClick={fetchData}>Buscar</button>
      </form>

      {/* Exibir os resultados */}
      <h3>Resultados:</h3>
    </div>
  );
};

export default SearchComponent;
