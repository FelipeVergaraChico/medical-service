/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "./OrsForm.module.css";
import Input from "./Input";
import Select from "./Select";

export default function OrsForm({ handleSubmit, orsData, btnText }) {
  const [ors, setOrs] = useState(orsData || {});
  const [urlClient, setUrlClient] = useState("");
  const [urlTechnical, setUrlTechnical] = useState("");

  const sigClientCanvas = useRef(null);
  const sigTechnicalCanvas = useRef(null);

  // Carrega as assinaturas do cliente e técnico no canvas quando `orsData` mudar
  useEffect(() => {
    if (orsData?.clientSign && sigClientCanvas.current) {
      sigClientCanvas.current.fromDataURL(orsData.clientSign);
    }
    if (orsData?.technicalSign && sigTechnicalCanvas.current) {
      sigTechnicalCanvas.current.fromDataURL(orsData.technicalSign);
    }
  }, [orsData]);


  // Função para capturar assinatura do cliente
  function saveClientSignature() {
    if (sigClientCanvas.current) {
      const clientUrl = sigClientCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setUrlClient(clientUrl);
      setOrs((prevOrs) => ({ ...prevOrs, clientSign: clientUrl }));
    }
  }

  // Função para capturar assinatura do técnico
  function saveTechnicalSignature() {
    if (sigTechnicalCanvas.current) {
      const technicalUrl = sigTechnicalCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setUrlTechnical(technicalUrl);
      setOrs((prevOrs) => ({ ...prevOrs, technicalSign: technicalUrl }));
    }
  }

  // Função para limpar a assinatura do cliente
  function handleClickClearSignClient() {
    sigClientCanvas.current.clear();
    setOrs({ ...ors, clientSign: "" });
  }

  // Função para limpar a assinatura do técnico
  function handleClickClearSignTechnical() {
    sigTechnicalCanvas.current.clear();
    setOrs({ ...ors, technicalSign: "" });
  }


  // Funções para Inputs e Submits
  function handleChange(e) {
    setOrs({ ...ors, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault()

    handleSubmit(ors)
  }

  return (
    <section className={styles.section}>
      <form onSubmit={submit} className={styles.form}>
        <h1 className={styles.h1}>Dados do Cliente</h1>
        <Input
          text="* Cliente:"
          type="text"
          name="client"
          placeholder="Digite o nome do cliente"
          handleOnChange={handleChange}
          value={ors.client || ""}
        />

        <Input
          text="Contato:"
          type="text"
          name="contact"
          placeholder="Digite o Contato"
          handleOnChange={handleChange}
          value={ors.contact || ""}
        />

        <Input
          text="* Endereço:"
          type="text"
          name="address"
          placeholder="Digite o Endereço"
          handleOnChange={handleChange}
          value={ors.address || ""}
        />

        <Input
          text="Fone:"
          type="text"
          name="phone"
          placeholder="Digite o Telefone"
          handleOnChange={handleChange}
          value={ors.phone || ""}
        />

        <Input
          text="Cnpj:"
          type="text"
          name="cnpj"
          placeholder="Digite o cnpj"
          handleOnChange={handleChange}
          value={ors.cnpj || ""}
        />

        <Input
          text="Email:"
          type="text"
          name="email"
          placeholder="Digite o Email"
          handleOnChange={handleChange}
          value={ors.email || ""}
        />

        <Input
          text="Data/Hora do chamado:"
          type="datetime-local"
          name="dateCall"
          placeholder="Digite a data e hora"
          handleOnChange={handleChange}
          value={ors.dateCall || ""}
        />

        <Input
          text="Duração do atendimento:"
          type="text"
          name="duration"
          placeholder="Digite a Duração do atendimento"
          handleOnChange={handleChange}
          value={ors.duration || ""}
        />

        <h1>Dados do Equipamento</h1>
        <Input
          text="Equipamento:"
          type="text"
          name="equipment"
          placeholder="Digite o Equipamento"
          handleOnChange={handleChange}
          value={ors.equipment || ""}
        />

        <Input
          text="Local/Sala:"
          type="text"
          name="local"
          placeholder="Digite o Local"
          handleOnChange={handleChange}
          value={ors.local || ""}
        />

        <Input
          text="* Marca:"
          type="text"
          name="brand"
          placeholder="Digite a marca"
          handleOnChange={handleChange}
          value={ors.brand || ""}
        />

        <Input
          text="* Modelo:"
          type="text"
          name="model"
          placeholder="Digite o modelo"
          handleOnChange={handleChange}
          value={ors.model || ""}
        />

        <Input
          text="Numero de serie:"
          type="text"
          name="serial"
          placeholder="Digite o modelo"
          handleOnChange={handleChange}
          value={ors.serial || ""}
        />

        <Input
          text="* Numero de patrimônio:"
          type="text"
          name="inventoryNumber"
          placeholder="Digite o patrimonio"
          handleOnChange={handleChange}
          value={ors.inventoryNumber || ""}
        />

        <Input
          text="Acessórios:"
          type="text"
          name="accessories"
          placeholder="Digite os Acessórios"
          handleOnChange={handleChange}
          value={ors.accessories || ""}
        />

        <h1>Defeito informado pelo cliente</h1>
        <Input
          text="Problema:"
          type="text"
          name="problem"
          placeholder="Digite o Problema"
          handleOnChange={handleChange}
          value={ors.problem || ""}
        />

        <h1>Observações</h1>
        <Input
          text="Observação:"
          type="text"
          name="observations"
          placeholder="Digite a observação"
          handleOnChange={handleChange}
          value={ors.observations || ""}
        />

        <h1>Serviços Realizados</h1>

        <Input
          text="* Serviços Realizados"
          type="text"
          name="realizedServices"
          placeholder="Digite os Serviços Realizados"
          handleOnChange={handleChange}
          value={ors.realizedServices || ""}
        />

        <h1>Componentes aplicados</h1>
        <Input
          text="Quantitade:"
          type="text"
          name="quantity"
          placeholder="Digite a Quantitade:"
          handleOnChange={handleChange}
          value={ors.quantity || ""}
        />

        <Input
          text="Descrição da peça:"
          type="text"
          name="descriptionOfParts"
          placeholder="Digite a Descrição da peça:"
          handleOnChange={handleChange}
          value={ors.descriptionOfParts || ""}
        />

        <Select
          name="* status"
          text="Selecione o status da ORS"
          options={[
            "Em andamento",
            "Manutenção Preventiva",
            "Manutenção Corretiva",
          ]}
          handleOnChange={handleChange}
          value={ors.status || ""}
        />

        <h1>Assinatura do Técnico *</h1>
        <div
          className={styles.div_sig}
        >
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 500, height: 200, className: styles.sigCanvas }}
            clearOnResize={false}
            ref={sigTechnicalCanvas}
            onEnd={saveTechnicalSignature} // Salva assinatura ao finalizar interação
          />
        </div>
        <button type="button" onClick={handleClickClearSignTechnical}>
          Limpar Assinatura Técnico
        </button>

        <Input
          text="* Nome do Assinante:"
          type="text"
          name="nameTechSign"
          placeholder="Digite o nome do Assinante"
          handleOnChange={handleChange}
          value={ors.nameTechSign || ""}
        />

        <Input
          text="* Data de entrega:"
          type="date"
          name="dateDelivery"
          placeholder="Digite a data aqui"
          handleOnChange={handleChange}
          value={ors.dateDelivery || ""}
        />

        <h1>Assinatura do Cliente *</h1>
        <div
          className={styles.div_sig}
        >
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 500, height: 200, className: styles.sigCanvas }}
            clearOnResize={false}
            ref={sigClientCanvas}
            onEnd={saveClientSignature} // Salva assinatura ao finalizar interação
          />
        </div>
        <button type="button" onClick={handleClickClearSignClient}>
          Limpar Assinatura Cliente
        </button>

        <Input
          text="* Nome do Assinante:"
          type="text"
          name="nameClientSign"
          placeholder="Digite o nome do Assinante"
          handleOnChange={handleChange}
          value={ors.nameClientSign || ""}
        />

        <input type="submit" value={`${btnText}`} />
      </form>
    </section>
  );
}