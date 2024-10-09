import { useState, useEffect } from "react";
import bus from "../../utils/bus";

import styles from "./Message.module.css";

function Message() {
    const [visibility, setVisibility] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [isHiding, setIsHiding] = useState(false); // Controla se a mensagem está "desaparecendo"

    useEffect(() => {
        const showFlashMessage = ({ message, type }) => {
            setVisibility(true);
            setMessage(message);
            setType(type);

            // Espera 3 segundos antes de começar a desaparecer
            setTimeout(() => {
                setIsHiding(true); // Inicia o desaparecimento
                setTimeout(() => {
                    setVisibility(false); // Oculta a mensagem após a transição
                    setIsHiding(false); // Reseta o estado de hiding
                }, 300); // O tempo da transição precisa ser o mesmo definido no CSS
            }, 3000);
        };

        bus.addListener("flash", showFlashMessage);

        // Limpa o listener ao desmontar o componente
        return () => bus.removeListener("flash", showFlashMessage);
    }, []);

    return (
        visibility && (
            <div className={`${styles.message} ${styles[type]} ${isHiding ? styles.hidden : ""}`}>
                {message}
            </div>
        )
    );
}

export default Message;
