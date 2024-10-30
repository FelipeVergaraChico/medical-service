/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./EditOrs.module.css";
import Input from "../../../../form/Input";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../../utils/api";
import useFlashMessage from "../../../../../hooks/useFlashMessage";
import Select from "../../../../form/Select";
import { VerifyUser } from "../../../../../hooks/VerifyUser";

export default function EditOrs() {
    const { id } = useParams();
    const [ors, setOrs] = useState({});

    const token = localStorage.getItem("token") || "";
    const { setFlashMessage } = useFlashMessage();
    const { verifyUser, verifyOrsUser } = VerifyUser()
    const navigate = useNavigate();

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
    }, [token, navigate]);


    // Funções para Inputs e Submits
    function handleChange(e) {
        setOrs({ ...ors, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
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
        <section className={styles.section}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.h1}>Dados do Cliente</h1>
                <Input
                    text="Cliente:"
                    type="text"
                    name="client"
                    placeholder="Digite o nome do cliente"
                    handleOnChange={handleChange}
                    value={ors.client}
                />

                <Input
                    text="Contato:"
                    type="text"
                    name="contact"
                    placeholder="Digite o Contato"
                    handleOnChange={handleChange}
                    value={ors.contact}
                />

                <Input
                    text="Endereço:"
                    type="text"
                    name="address"
                    placeholder="Digite o Endereço"
                    handleOnChange={handleChange}
                    value={ors.address}
                />

                <Input
                    text="Fone:"
                    type="text"
                    name="phone"
                    placeholder="Digite o Telefone"
                    handleOnChange={handleChange}
                    value={ors.phone}
                />

                <Input
                    text="Cnpj:"
                    type="text"
                    name="cnpj"
                    placeholder="Digite o cnpj"
                    handleOnChange={handleChange}
                    value={ors.cnpj}
                />

                <Input
                    text="Email:"
                    type="text"
                    name="email"
                    placeholder="Digite o Email"
                    handleOnChange={handleChange}
                    value={ors.email}
                />

                <Input
                    text="Data/Hora do chamado:"
                    type="datetime-local"
                    name="dateCall"
                    placeholder="Digite a data e hora"
                    handleOnChange={handleChange}
                    value={ors.dateCall}
                />

                <Input
                    text="Duração do atendimento:"
                    type="text"
                    name="duration"
                    placeholder="Digite a Duração do atendimento"
                    handleOnChange={handleChange}
                    value={ors.duration}
                />

                <h1>Dados do Equipamento</h1>
                <Input
                    text="Equipamento:"
                    type="text"
                    name="equipment"
                    placeholder="Digite o Equipamento"
                    handleOnChange={handleChange}
                    value={ors.equipment}
                />

                <Input
                    text="Local/Sala:"
                    type="text"
                    name="local"
                    placeholder="Digite o Local"
                    handleOnChange={handleChange}
                    value={ors.local}
                />

                <Input
                    text="Marca:"
                    type="text"
                    name="brand"
                    placeholder="Digite a marca"
                    handleOnChange={handleChange}
                    value={ors.brand}
                />

                <Input
                    text="Modelo:"
                    type="text"
                    name="model"
                    placeholder="Digite o modelo"
                    handleOnChange={handleChange}
                    value={ors.model}
                />

                <Input
                    text="Numero de serie:"
                    type="text"
                    name="serial"
                    placeholder="Digite o modelo"
                    handleOnChange={handleChange}
                    value={ors.serial}
                />

                <Input
                    text="Numero de patrimônio:"
                    type="text"
                    name="inventoryNumber"
                    placeholder="Digite o patrimonio"
                    handleOnChange={handleChange}
                    value={ors.inventoryNumber}
                />

                <Input
                    text="Acessórios:"
                    type="text"
                    name="accessories"
                    placeholder="Digite os Acessórios"
                    handleOnChange={handleChange}
                    value={ors.accessories}
                />

                <h1>Defeito informado pelo cliente</h1>
                <Input
                    text="Problema:"
                    type="text"
                    name="problem"
                    placeholder="Digite o Problema"
                    handleOnChange={handleChange}
                    value={ors.problem}
                />

                <h1>Observações</h1>
                <Input
                    text="Observação:"
                    type="text"
                    name="observations"
                    placeholder="Digite a observação"
                    handleOnChange={handleChange}
                    value={ors.observations}
                />

                <h1>Serviços Realizados</h1>

                <Input
                    text="Serviços Realizados"
                    type="text"
                    name="realizedServices"
                    placeholder="Digite os Serviços Realizados"
                    handleOnChange={handleChange}
                    value={ors.realizedServices}
                />

                <h1>Componentes aplicados</h1>
                <Input
                    text="Quantitade:"
                    type="text"
                    name="quantity"
                    placeholder="Digite a Quantitade:"
                    handleOnChange={handleChange}
                    value={ors.quantity}
                />

                <Input
                    text="Descrição da peça:"
                    type="text"
                    name="descriptionOfParts"
                    placeholder="Digite a Descrição da peça:"
                    handleOnChange={handleChange}
                    value={ors.descriptionOfParts}
                />

                <Select
                    name="status"
                    text="Selecione o status da ORS"
                    options={[
                        "Em andamento",
                        "Manutenção Preventiva",
                        "Manutenção Corretiva",
                    ]}
                    handleOnChange={handleChange}
                    value={ors.status || ""}
                />

                <Input
                    text="Data de entrega:"
                    type="date"
                    name="dateDelivery"
                    placeholder="Digite a data aqui"
                    handleOnChange={handleChange}
                    value={ors.dateDelivery}
                />

                <input type="submit" value="Enviar ORS" />
            </form>
        </section>
    );
}