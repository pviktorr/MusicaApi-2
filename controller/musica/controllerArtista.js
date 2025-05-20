/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const artistaDAO = require('../../model/DAO/artistas.js')
const controllerNacionalidade = require('./controllerNacionalidade.js')

//Função para tratar a inserção de um novo filme no DAO
const inserirArtista = async function(artista, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (artista.nome              == ''           || artista.nome               == undefined    || artista.nome            == null || artista.nome.length > 80   ||
                    
                    artista.id_nacionalidade  == ''           || artista.id_nacionalidade  == undefined  || artista.id_nacionalidade == null
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultArtista = await artistaDAO.insertArtista(artista)

                    if(resultArtista)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um filme no DAO
const atualizarArtista = async function(id, artista, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                      == ''           || id                       == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                    artista.nome              == ''           || artista.nome               == undefined    || artista.nome            == null || artista.nome.length > 80   ||
                    artista.id_nacionalidade  == ''           || artista.id_nacionalidade  == undefined
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultArtista= await artistaDAO.selectByIdArtista(parseInt(id))

                    if(resultArtista != false || typeof(resultArtista) == 'object'){
                        if(resultArtista.length > 0 ){
                            //Update
                            //Adiciona o ID do filme no JSON com os dados
                            artista.id = parseInt(id)

                            let result = await artistaDAO.updateArtista(artista)

                            if(result){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um filme no DAO
const excluirArtista = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultArtista = await artistaDAO.selectByIdArtista(parseInt(id))

            if(resultArtista != false || typeof(resultArtista) == 'object'){
                //Se existir, faremos o delete
                if(resultArtista.length > 0){
                    //delete
                    let result = await artistaDAO.deleteArtista(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de filmes do DAO
const listarArtista = async function(){
    try {
        //Cria um objeto array para montar a nova estrutura de filmes no forEach
        let arrayArtista = []

        //Objeto do tipo JSON
        let dadosArtista = {}
        //Chama a função para retornar os filmes cadastrados
        let resultArtista = await artistaDAO.selectAllArtista()
        console.log(resultArtista)

        if(resultArtista != false || typeof(resultArtista) == 'object'){
            if(resultArtista.length > 0){

               
                //Criando um JSON de retorno de dados para a API
                dadosArtista.status = true
                dadosArtista.status_code = 200
                dadosArtista.items = resultArtista.length
                
                //Percorrer o array de filmes para pegar cada ID de classificação
                // e descobrir quais os dados da classificação
                
                // resultArtista.forEach( async function(itemFilme){
                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemArtista of resultArtista){
                    /* Monta o objeto da classificação para retornar no Filme (1XN) */
                        //Busca os dados da classificação na controller de classificacao
                        let dadosNacionalidade = await controllerNacionalidade.buscarNacionalidade(itemArtista.id_nacionalidade)
                        //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                        itemArtista.nacionalidade = dadosNacionalidade.nacionalidade
                        //Remover um atributo do JSON
                       
                    /* */ 
                    arrayArtista.push(itemArtista)
                }

                // console.log(arrayArtista)
                dadosArtista.artists = arrayArtista

                return dadosArtista
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {   

        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um filme filtrando pelo ID do DAO
const buscarArtista = async function(id){
    try {

        let arrayArtista = []
        
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosArtista = {}

            let resultArtista = await artistaDAO.selectByIdArtista(parseInt(id))
            
            if(resultArtista != false || typeof(resultArtista) == 'object'){
                if(resultArtista.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosArtista.status = true
                     dadosArtista.status_code = 200
                    
                     //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemArtista of resultArtista){
                    //Busca os dados da classificação na controller de classificacao
                    let dadosNacionalidade = await controllerNacionalidade.buscarNacionalidade(itemArtista.id_nacionalidade)
                    
                    //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                    itemArtista.nacionalidade = dadosNacionalidade.nacionalidade
                    
                    //Remover um atributo do JSON
                    delete itemArtista.id_nacionalidade
                    
                    //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                    arrayFilmes.push(itemFilme)
 
                }
                
                dadosArtista.artists = arrayArtista

                    // dadosFilme.films = resultFilme

                    return dadosArtista //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirArtista,
    atualizarArtista,
    excluirArtista,
    listarArtista,
    buscarArtista
} 