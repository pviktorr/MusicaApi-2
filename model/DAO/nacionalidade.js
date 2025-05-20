/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de filmes
 * Data: 11/02/2025
 * Autor: Pedro Victor
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo Filme
const insertNacionalidade = async function (nacionalidade) {
    try {

        let sql = `insert into tbl_nacionalidade  ( 
    
        nome
                
                                        ) 
                                          values 
                                        (
                                        
                                    
                                          '${nacionalidade.nome}'
                                        )`
        //console.log(sql)

        //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
        //saber se deu certo                                  
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {

        return false
    }
}

//Função para atualizar um Filme existente
const updateNacionalidade = async function (nacionalidade) {
    try {
        let sql = `update tbl_nacionalidade set     nome            = '${nacionalidade.nome}',
                                          
                                        
                            where id = ${nacionalidade.id}                
                            `
        let resultNacionalidade = await prisma.$executeRawUnsafe(sql)

        if (resultNacionalidade)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir um Filme existente
const deleteNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidade where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para retornar todos os Filmes existentes
const selectAllNacionalidade = async function () {

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_nacionalidade order by id desc'

        //Executa o scriptSQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para buscar um Filme pelo ID
const selectByIdNacionalidade = async function (id) {
    try {
        let sql = `select * from tbl_nacionalidade where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade
} 