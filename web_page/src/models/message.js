// Not so Secret :)
const messageTemplate = {
    "secret_key": "kdoLDkd8998d5dlD",
    "number": "",
    "message": ""
  };

const messageModel = (number, message) => {
    messageTemplate.number = number;
    messageTemplate.message = message;
    return JSON.stringify(messageTemplate);
};  

export {messageTemplate, messageModel};  