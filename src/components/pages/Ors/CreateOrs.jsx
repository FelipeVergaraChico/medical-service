import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrsForm from "../../form/OrsForm";
import { VerifyUser } from "../../../hooks/VerifyUser";


export default function CreateOrs() {
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const { verifyUser } = VerifyUser()

  useEffect(() => {
    verifyUser(token)
  }, [token, navigate]);

  return (
    <section>
      <OrsForm />
    </section>
  );
}