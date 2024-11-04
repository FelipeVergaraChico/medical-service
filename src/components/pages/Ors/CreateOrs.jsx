import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrsForm from "../../form/OrsForm";
import { VerifyUser } from "../../../hooks/VerifyUser";
import apiInstance from "../../../utils/api";
import useFlashMessage from "../../../hooks/useFlashMessage";


export default function CreateOrs() {
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const { verifyUser } = VerifyUser()
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    verifyUser(token)
  }, [token, navigate]);

  async function registerOrs(ors) {
    console.log("Dados enviados no objeto ORS:", ors);

    let msgType = "success";

    const data = await apiInstance
      .post("ors/add", ors, {
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
      <OrsForm handleSubmit={registerOrs} btnText="Enviar ORS" />
    </section>
  );
}