import jsPDF from "jspdf";

// Função para carregar a imagem da logo
const loadLogoImage = async (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};

export const GeneratePDF = () => {
  const generateDocument = async (or) => {
    const doc = new jsPDF();

    // Carregar logo como base64 para evitar problemas de carregamento
    const logoUrl = "/pantanal-removebg-preview.png"; // URL da sua logo
    const logoImage = await loadLogoImage(logoUrl);
    
    // Convertendo a imagem para Base64
    const canvas = document.createElement('canvas');
    canvas.width = logoImage.width;
    canvas.height = logoImage.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(logoImage, 0, 0);
    const logoBase64 = canvas.toDataURL('image/png');

    // Helper function to format date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
    };

    const marginLeft = 10;
    let currentHeight = 40; // Starting height position (ajuste para não sobrepor a logo)

    // Adicionar a logo ao PDF
    doc.addImage(logoBase64, "PNG", marginLeft, 10, 50, 20);

    // Helper functions
    const addSectionTitle = (title, x, y) => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, x, y);
    };

    const addField = (label, value, x, y, maxWidth = 60) => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      
      // Desenha o label seguido diretamente pelo valor
      const textLines = doc.splitTextToSize(value || "N/A", maxWidth);
      doc.text(`${label}: ${textLines[0]}`, x, y);

      // Caso haja mais linhas para o valor, desenha-as logo abaixo
      if (textLines.length > 1) {
        doc.text(textLines.slice(1), x, y + 5);
      }

      // Retorna a altura do campo, considerando a quantidade de linhas
      return textLines.length * 7; // Aproximadamente 7px por linha
    };

    // Dados do Cliente e Dados do Equipamento lado a lado
    const sectionLeftX = marginLeft; // X para a seção esquerda
    const sectionRightX = marginLeft + 100; // X para a seção direita

    // Seções lado a lado
    addSectionTitle("Dados do Cliente", sectionLeftX, currentHeight);
    addSectionTitle("Dados do Equipamento", sectionRightX, currentHeight);
    currentHeight += 10;

    // Campos do cliente (lado esquerdo)
    currentHeight += addField("Cliente", or.client, sectionLeftX, currentHeight);
    currentHeight += addField("Contato", or.contact, sectionLeftX, currentHeight);
    currentHeight += addField("Endereço", or.address, sectionLeftX, currentHeight);
    currentHeight += addField("Telefone", or.phone, sectionLeftX, currentHeight);
    currentHeight += addField("Cnpj", or.cnpj, sectionLeftX, currentHeight);
    currentHeight += addField("Email", or.email, sectionLeftX, currentHeight);
    currentHeight += addField("Data do Chamado", formatDate(or.dateCall), sectionLeftX, currentHeight);
    currentHeight += addField("Duração", or.duration, sectionLeftX, currentHeight);

    // Campos do equipamento (lado direito)
    let equipmentHeight = 50; // Reinicia altura para a seção direita
    equipmentHeight += addField("Equipamento", or.equipment, sectionRightX, equipmentHeight);
    equipmentHeight += addField("Marca", or.brand, sectionRightX, equipmentHeight);
    equipmentHeight += addField("Modelo", or.model, sectionRightX, equipmentHeight);
    equipmentHeight += addField("Número de Série", or.serial, sectionRightX, equipmentHeight);
    equipmentHeight += addField("Nº Patrimônio", or.inventoryNumber, sectionRightX, equipmentHeight);
    equipmentHeight += addField("Acessórios", or.accessories, sectionRightX, equipmentHeight);

    // Ajusta a altura atual com base na maior altura entre as colunas
    currentHeight = Math.max(currentHeight, equipmentHeight);
    currentHeight += 20; // Adiciona um espaço entre as seções

    // Defeito informado e Observações lado a lado
    let problemHeight = currentHeight + 10;
    addSectionTitle("Defeito Informado", sectionLeftX, currentHeight);
    problemHeight += addField("Defeito", or.problem, sectionLeftX, problemHeight);
    
    let observationsHeight = currentHeight + 10;
    addSectionTitle("Observações", sectionRightX, currentHeight);
    observationsHeight += addField("Observações", or.observations, sectionRightX, observationsHeight);

    currentHeight += 30; // Espaço para passar para a próxima seção

    // Serviços Realizados lado a lado
    let serviceHeight = currentHeight + 10;
    addSectionTitle("Serviços Realizados", sectionLeftX, currentHeight);
    serviceHeight += addField("Serviços", or.realizedServices, sectionLeftX, serviceHeight);
    
    let quantityHeight = currentHeight + 10;
    addSectionTitle("Componentes Aplicados", sectionRightX, currentHeight);
    quantityHeight += addField("Descrição das Peças", or.descriptionOfParts, sectionRightX, quantityHeight);
    

    currentHeight += 40; // Espaço extra antes das assinaturas

    let dateDeliveryHeight = currentHeight + 20;
    dateDeliveryHeight += addField("Data de Entrega", formatDate(or.dateDelivery), sectionRightX, serviceHeight);
    // Assinaturas
    if (or.clientSign && or.technicalSign) {
      addSectionTitle("Assinaturas", marginLeft, serviceHeight);

      // Assinatura do Cliente
      doc.addImage(or.clientSign, "PNG", marginLeft, serviceHeight + 10, 50, 30);
      doc.text("Assinatura do Cliente", marginLeft, serviceHeight + 45);
      doc.text(or.nameClientSign || "N/A", marginLeft, serviceHeight + 50); // Nome do cliente

      // Assinatura do Técnico
      doc.addImage(or.technicalSign, "PNG", marginLeft + 100, serviceHeight + 10, 50, 30);
      doc.text("Assinatura do Técnico", marginLeft + 100, serviceHeight + 45);
      doc.text(or.nameTechSign || "N/A", marginLeft + 100, serviceHeight + 50); // Nome do técnico
    }

    doc.save(`${or._id}.pdf`); // Salva o PDF
  };

  return { generateDocument };
};
