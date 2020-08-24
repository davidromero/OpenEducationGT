const documentTemplate = {
    "document_name": "",
  };

const documentModel = (name) => {
    documentTemplate.document_name = name
    return JSON.stringify(documentTemplate);
};  

export {documentTemplate, documentModel};