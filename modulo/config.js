
/****************************************************************************************************************
Objetivo: Arquivo Responsável pela padronização de mensagens e status code 
Data : 18/02/2025 
versão: 1.0 
Autor: Pedro Victor

*******************************************************************************************************************/ 

/**********************************************Status Code de Erros ***********************************************/ 

const ERROR_REQUIRED_FIELDS = {status: false,  status_code: 400,    message: "Existem campos origatórios ou quantidade de caracteres que nao foram atendidos " }
const ERROR_INTERNAR_SERVER_MODEL = {status: false,  status_code: 500,    message: "Devido a um erro interno no servidor da MODEL, não foi possivel processar a requisção "}
const ERROR_INTERNAR_SERVER_CONTROLLER = {status: false,  status_code: 500,    message: "Devido a um erro interno no servidor da CONTROLLER, não foi possivel processar a requisção "}
const ERROR_CONTENT_TYPE = {status: false,  status_code: 415,    message: "O content-type encaminhado não é suportado pelo servidor. Você deve encaminhar apenas conteúdos no formato JSON"}
const ERROR_NOT_FOUND = {status: false,  status_code: 404,    message: "Não foram encontrados itens de retorno"}
/***************************************** Status code de sucesso ****************************************************/
const SUCCESS_CREATED_ITEM = {status: true,  
                             status_code: 201,    
                             message:"Item criado com sucesso"}
const SUCCESS_DELETE_ITEM = {
    status: true,
    status_code:200,
    message: "Item excluido com sucesso!"
}
const SUCCESS_UPDATED_ITEM = {
    status: true,
    status_code: 200,
    message: "Item atualizado com sucesso"
}
module.exports = {
        ERROR_REQUIRED_FIELDS,
        SUCCESS_CREATED_ITEM,
        ERROR_INTERNAR_SERVER_CONTROLLER,
        ERROR_INTERNAR_SERVER_MODEL,
        ERROR_CONTENT_TYPE,
        ERROR_NOT_FOUND,
        SUCCESS_DELETE_ITEM,
        SUCCESS_UPDATED_ITEM
    }
