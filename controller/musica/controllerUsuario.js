
/*
Objetivo: Controller referente as ações de CRUD de Música 
Data : 11?02/2025

*/
//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const usuarioDAO = require('../../model/DAO/usuario.js')

//Função para inserir uma nova musica
const inserirUsuario = async function (usuario, contentType) {
    try {

        if (String(contentType).toLowerCase == 'application/json') {

            if (usuario.nome == '' || usuario.nome == null || usuario.nome == undefined || usuario.nome.length > 100 ||
                usuario.email == '' || usuario.email == null || usuario.email == undefined || usuario.email.length > 8

            ) {
                return message.ERROR_REQUIRED_FIELDS//status code 400
            } else {
                //encaminhando os dados da musica para o DAO realizar o insert no Banco de dados
                let resultUsuario = await usuarioDAO.insertUsuario(usuario)

                if (resultUsuario) {
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

//Função para atualizar um usuario existente
const atualizarUsuario = async function (id, usuario, contentType) {

    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            if (usuario.nome == '' || usuario.nome == null || usuario.nome == undefined || usuario.nome.length > 100 ||
                usuario.email == ''|| usuario.email == null|| usuario.email == undefined|| usuario.email.length > 8  ||
                id            == ''|| id == undefined      || id == null                || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS//status code 400
            } else {
                //verifica se o ID existe no BD
                let result = await usuarioDAO.selectByIdUsuario(id)

                if (result != false || typeof (result) == 'object') {
                    if (result.length > 0) {
                        //Update
                        //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                        usuario.id = id
                        let resultUsuario = await usuarioDAO.updateUsuario(usuario)
                        if (resultUsuario) {
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
const excluirUsuario = async function (id) {
    try {
        if (id == "" || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            //Antes de excluir, estamos verificando se existe este id 
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if (resultUsuario != false || typeof (resultUsuario) == 'object') {
                if (resultUsuario.length > 0) {
                    //delete
                    let result = await usuarioDAO.deleteUsuario(id)

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
const listarUsuario = async function () {
    try {
        //Obejto JSON 
        let dadosUsuario = {}

        //Chama a função para retornar as musicas do banco de dados
        let resultUsuario = await usuarioDAO.selectAllUsuario()


        if (resultUsuario != false) {
            //Cria um JSON para colocar o rarry de musicas
            if (resultUsuario.length > 0) {
                dadosUsuario.status = true
                dadosUsuario.status_code = 200,
                dadosUsuario.items = resultUsuario.length
                dadosUsuario.users = resultUsuario

                return dadosUsuario
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
const buscarUsuario = async function (numero) {

    try {

        let id = numero



        if (id == "" || id == null || isNaN(id) || id == undefined) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosUsuario = {}
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)


            if (resultUsuario != false || typeof (resultUsuario) == 'object') {
                //Cria um JSON para colocar o rarry de musicas
                if (resultUsuario.length > 0) {
                    dadosUsuario.status = true
                    dadosUsuario.status_code = 200,
                        dadosUsuario.users = resultUsuario

                    return dadosUsuario

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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}
