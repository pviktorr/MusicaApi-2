/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de classificacao
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const nacionalidadeDAO = require('../../model/DAO/nacionalidade.js')

//Função para tratar a inserção de um novo classificacao no DAO
const inserirNacionalidade = async function (nacionalidade, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (nacionalidade.nome == '' || nacionalidade.nome == undefined ||
                nacionalidade.nome == null || nacionalidade.nome.length > 80

            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultNacionalidade = await nacionalidadeDAO.insertNacionalidade(nacionalidade)

                if (resultNacionalidade)
                    return message.SUCCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um classificacao no DAO
const atualizarClassificacao = async function (id, classificacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                classificacao.nome == '' || classificacao.nome == undefined || classificacao.nome == null || classificacao.nome.length > 80 ||
                classificacao.sigla == '' || classificacao.sigla == undefined || classificacao.sigla == null || classificacao.duracao.sigla > 5 ||
                classificacao.descricao == '' || classificacao.descricao == undefined || classificacao.descricao == null || classificacao.duracao.sigla > 200
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(parseInt(id))

                if (resultClassificacao != false || typeof (resultClassificacao) == 'object') {
                    if (resultClassificacao.length > 0) {
                        //Update
                        //Adiciona o ID do classificacao no JSON com os dados
                        classificacao.id = parseInt(id)

                        let result = await classificacaoDAO.updateClassificacao(classificacao)

                        if (result) {
                            return message.SUCCESS_UPDATED_ITEM //200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    } else {
                        return message.ERROR_NOT_FOUND //404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um classificacao no DAO
const excluirClassificacao = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //Funcção que verifica se  ID existe no BD
            let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(parseInt(id))

            if (resultClassificacao != false || typeof (resultClassificacao) == 'object') {
                //Se existir, faremos o delete
                if (resultClassificacao.length > 0) {
                    //delete
                    let result = await classificacaoDAO.deleteClassificacao(parseInt(id))

                    if (result) {
                        return message.SUCCESS_DELETED_ITEM //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de classificacaos do DAO
const listarNacionalidade = async function () {
    try {
        //Objeto do tipo JSON
        let dadosNacionalidade = {}
        //Chama a função para retornar os classificacaos cadastrados
        let resultNacionalidade = await nacionalidadeDAO.selectAllnacionalidade()

        if (resultNacionalidade != false || typeof (resultNacionalidade) == 'object') {
            if (resultNacionalidade.length > 0) {
                //Criando um JSON de retorno de dados para a API
                dadosNacionalidade.status = true
                dadosNacionalidade.status_code = 200
                dadosNacionalidade.items = resultNacionalidade.length
                dadosNacionalidade.nacionalidade = resultNacionalidade

                return dadosNacionalidade
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um classificacao filtrando pelo ID do DAO
const buscarNacionalidade = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosNacionalidade = {}

            let resultNacionalidade = await nacionalidadeDAO.selectByIdNacionalidade(parseInt(id))

            if (resultNacionalidade != false || typeof (resultNacionalidade) == 'object') {
                if (resultNacionalidade.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosNacionalidade.status = true
                    dadosNacionalidade.status_code = 200
                    dadosNacionalidade.nacionalidade = resultNacionalidade

                    return  dadosNacionalidade //200
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirNacionalidade,
    listarNacionalidade,
    buscarNacionalidade
} 