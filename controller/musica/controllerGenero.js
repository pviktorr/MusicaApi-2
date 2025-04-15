/*
Obejetivo: Controller referente as ações de CRUD de Música 
Data : 11?02/2025

*/
//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const generoDAO = require('../../model/DAO/genero.js')

//Função para inserir um novo genero




const inserirGenero = async function (genero, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            if (genero.nome == '' || genero.nome == null || genero.nome == undefined || genero.nome > 100
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
            } else {

                //encaminhando os dados da musica para o DAO realizar o insert no Banco de dados
                let resultGenero = await generoDAO.insertGenero(genero)

                if (resultGenero) {
                    return message.SUCCESS_CREATED_ITEM // 201
                } else
                    return message.ERROR_INTERNAL_SERVER_MODEL//500

            }
        } else {
            return message.ERROR_INTERNAR_SERVER_CONTROLLER //500
        }

    } catch (error) {
        return message.ERROR_INTERNAR_SERVER_CONTROLLER //500
    }

}

//Função para atualizar uma musica existente
const atualizarGenero = async function (id, genero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            if (genero.nome == null || genero.nome == undefined || genero.nome.length > 100 ||
                id == '' || id == undefined || id == null || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS//status code 400
            } else {
                //verifica se o ID existe no BD
                let result = await generoDAO.selectByIdMusica(id)

                if (result != false || typeof (result) == 'object') {
                    if (result.length > 0) {
                        //Update
                        //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                        genero.id = id
                        let resultGenero = await generoDAO.updateGenero(genero)
                        if (resultGenero) {
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
const excluirGenero = async function () {
    try {
        if (id == "" || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            //Antes de excluir, estamos verificando se existe este id 
            let resultGenero = await generoDAO.selectByIdGenero(id)

            if (resultGenero != false || typeof (resultGenero) == 'object') {
                if (resultGenero.length > 0) {
                    //delete
                    let result = await generoDAO.deleteGenero(id)

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
const listarGenero = async function () {
    try {
        //Obejto JSON 
        let dadosGenero = {}

        //Chama a função para retornar as musicas do banco de dados
        let resultGenero = await generoDAO.selectAllgenero()


        if (resultMusica != false) {
            //Cria um JSON para colocar o rarry de musicas
            if (resultGenero.length > 0) {
                dadosGenero.status = true
                dadosGenero.status_code = 200,
                    dadosGenero.items = dadosGenero.length
                dadosGenero.genders = dadosGenero

                return dadosGenero
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
const buscarGenero = async function () {
    try {

        let id = numero



        if (id == "" || id == null || isNaN(id) || id == undefined) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosGenero = {}
            let resultGenero = await generoDAO.selectByIdGenero(id)


            if (resultGenero != false || typeof (resultGenero) == 'object') {
                //Cria um JSON para colocar o rarry de musicas
                if (resultGenero.length > 0) {
                    dadosGenero.status = true
                    dadosGenero.status_code = 200,
                        dadosGenero.musics = resultGenero

                    return dadosGenero

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
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero

}