
/*
Objetivo: Controller referente as ações de CRUD de Música 
Data : 11?02/2025

*/
//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const gravadoraDAO = require('../../model/DAO/gravadora.js')

//Função para inserir uma nova musica
const inserirGravadora = async function (gravadora, contentType) {
    try {

        if (String(contentType).toLowerCase == 'application/json') {

            if (gravadora.nome == '' || gravadora.nome == null || gravadora.nome == undefined || gravadora.nome.length > 100 ||
                gravadora.email == '' || gravadora.email == null || gravadora.email == undefined || gravadora.email.length > 8


            ) {
                return message.ERROR_REQUIRED_FIELDS//status code 400
            } else {
                //encaminhando os dados da musica para o DAO realizar o insert no Banco de dados
                let resultGravadora = await gravadoraDAO.insertGravadora(gravadora)

                if (resultMusica) {
                    return message.SUCCESS_CREATED_ITEM // 201
                } else
                    return message.ERROR_INTERNAL_SERVER_MODEL//500

            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAR_SERVER_CONTROLLER //500
    }

}

//Função para atualizar uma musica existente
const atualizarGravadora = async function (id, gravadora, contentType) {

    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            if (gravadora.nome == '' || gravadora.nome == null || gravadora.nome == undefined || gravadora.nome.length > 100 ||
                gravadora.duracao == '' || gravadora.duracao == null || gravadora.duracao == undefined || gravadora.duracao.length > 8 ||
                id == '' || id == undefined || id == null || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS//status code 400
            } else {
                //verifica se o ID existe no BD
                let result = await gravadoraDAO.selectByIdGravadora(id)

                if (result != false || typeof (result) == 'object') {
                    if (result.length > 0) {
                        //Update
                        //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                        gravadora.id = id
                        let resultGravadora = await gravadoraDAO.updateGravadora(gravadora)
                        if (resultGravadora) {
                            return message.SUCCESS_UPDATED_ITEM
                        } else {
                            return message.ERROR_INTERNAR_SERVER_MODEL //500
                        }
                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAR_SERVER_CONTROLLER //500
    }



}

//Função para excluir uma musica existente
const excluirGravadora = async function (id) {
    try {
        if (id == "" || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            //Antes de excluir, estamos verificando se existe este id 
            let resultGravadora = await gravadoraDAO.selectByIdGravadora(id)

            if (resultGravadora != false || typeof (resultGravadora) == 'object') {
                if (resultGravadora.length > 0) {
                    //delete
                    let result = await gravadoraDAO.deleteGravadora(id)

                    if (result)
                        return message.SUCCESS_DELETE_ITEM
                    else
                        return message.ERROR_INTERNAR_SERVER_MODEL //500
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAR_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAR_SERVER_CONTROLLER //500
    }



}


//Função para retornar uma lista de músicas
const listarGravadora = async function () {
    try {
        //Obejto JSON 
        let dadosGravadora = {}

        //Chama a função para retornar as musicas do banco de dados
        let resultGravadora = await gravadoraDAO.selectAllGravadora()


        if (resultGravadora != false) {
            //Cria um JSON para colocar o rarry de musicas
            if (resultGravadora.length > 0) {
                dadosGravadora.status = true
                dadosGravadora.status_code = 200,
                dadosGravadora.items = resultGravadora.length
                dadosGravadora.musics = resultGravadora

                return dadosGravadora
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAR_SERVER_MODEL // 500
        }

    } catch (error) {
        return message.ERROR_INTERNAR_SERVER_CONTROLLER //500
    }

}

//Função para buscar uma musica pelo ID
const buscarGravadora = async function (numero) {

    try {

        let id = numero



        if (id == "" || id == null || isNaN(id) || id == undefined) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosGravadora = {}
            let resultGravadora = await gravadoraDAO.selectByIdGravadora(id)


            if (resultGravadora != false || typeof (resultGravadora) == 'object') {
                //Cria um JSON para colocar o rarry de musicas
                if (resultGravadora.length > 0) {
                    dadosGravadora.status = true
                    dadosGravadora.status_code = 200,
                    dadosGravadora.musics = resultGravadora

                    return dadosGravadora

                } else {
                    return message.ERROR_NOT_FOUND //404
                }

            } else {
                return message.ERROR_INTERNAR_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    inserirGravadora,
    atualizarGravadora,
    excluirGravadora,
    listarGravadora,
    buscarGravadora
}
