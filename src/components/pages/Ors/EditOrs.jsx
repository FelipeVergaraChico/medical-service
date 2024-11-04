import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrsForm from "../../form/OrsForm";
import { VerifyUser } from "../../../hooks/VerifyUser";
import apiInstance from "../../../utils/api";
import useFlashMessage from "../../../hooks/useFlashMessage";


export default function EditOrs() {
    const token = localStorage.getItem("token") || "";
    const navigate = useNavigate();
    const { verifyUser, verifyOrsUser } = VerifyUser()
    const { setFlashMessage } = useFlashMessage()
    const { id } = useParams();
    const [ors, setOrs] = useState([]);


    useEffect(() => {
        verifyUser(token)
        verifyOrsUser(id, token)

        // Pegar Ors
        apiInstance.get(`ors/edit/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,  // Token sem JSON.parse()
            },
        })
            .then((response) => {
                setOrs(response.data.ors)
                console.log(response)
            })
            .catch((error) => {
                console.error("Erro ao buscar a ORS");
                navigate("/");  // Redireciona para login em caso de erro
            })
    }, [token, navigate, id]);

    useEffect(() => {
        verifyUser(token)
    }, [token, navigate]);

    async function updateOrs(ors) {
        console.log("Dados enviados no objeto ORS:", ors);

        let msgType = "success";

        const data = await apiInstance
            .patch(`ors/edit/${id}`, ors, {
                Authorization: `Bearer ${JSON.parse(token)}`,
                "Content-Type": "multipart/form-data",
            })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                msgType = "error";
                return err.response.data;
            });


        setFlashMessage(data.message, msgType);

        if (msgType !== "error") {
            navigate("/");
        }
    }

    return (
        <section>
            <OrsForm handleSubmit={updateOrs} orsData={ors} btnText="Editar ORS" />
        </section>
    );
}