/* eslint-disable react/prop-types */
import { FaFileDownload } from "react-icons/fa";
import styles from "./Ors.module.css";
import { GeneratePDF } from "../../../../../hooks/usePDF";
import { FaEdit } from "react-icons/fa";

export default function Ors({ ors }){
    const { generateDocument } = GeneratePDF();
    

    async function handleClick(or){  
        generateDocument(or)
    }

    return (
        <section className={styles.container}>
            {ors.map((or, index) => (
                <div key={index} className={styles.orsCard}>
                <h2 className={styles.orsHeader}>ORS #{or._id}</h2>
                <p className={styles.orsDetails}>Cliente: {or.client}</p>
                <p className={styles.orsDetails}>Endereço: {or.address}</p>
                <p className={styles.orsDetails}>Equipamento: {or.equipment}</p>
                <p className={styles.orsDetails}>
                    Data de entrega:{" "}
                    {new Date(new Date(or.dateDelivery).getTime() + new Date(or.dateDelivery).getTimezoneOffset() * 60000).toLocaleDateString("pt-BR")}
                </p>
                <p className={styles.orsDetails}>Status: {or.status}</p>
                <div className={styles.orsButtons}>
                    <button className={styles.actionButton} onClick={() => handleClick(or)}>
                        <FaFileDownload /> <span>Baixar PDF</span>
                    </button>
                    <Link to={`/edit/${or._id}`}><FaEdit />Editar</Link>
                </div>
                </div>
            ))}

        </section>
    )
}   
