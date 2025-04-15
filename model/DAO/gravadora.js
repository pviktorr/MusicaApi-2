
/**************************************************************
 * Objetivo : Criar o CRUD de dados da tabela de gravadora no banco de dados 
 * Data : 11/02/2025
 * Autor : Marcel
 * Versão : 1.0  
***************************************************************/
//Import da biblioteca do prisma client para realizar as ações no Banco de Dados 
const { prismaClient, PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client(cria um objeto)
const prisma = new PrismaClient()

//Função para inserir uma gravadora 
const insertGravadora = async function (gravadora) {
    try {


        let sql = ` insert into tbl_gravadora (
                         nome, 
                         email, 
                         
                                '${gravadora.nome}',
                                '${gravadora.email}',
                          )`
        //Executa o script SQL no banco de dados e aguarda o resultado (true ou false)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false  //Bug do BD

    } catch (error) {
        console.log(error)
        return false //Bug de Programação 
    }

}
//Função para atualizar um musica existente
const updateGravadora = async function (gravadora) {
    try {
        let sql = `update tbl_gravadora set nome =' ${gravadora.nome}',
                                    email = '${musica.email}' `

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}
//Função para excluir uma musica 
const deleteGravadora = async function (id) {
    try {
        let sql = `delete from tbl_gravadora where id = ${id}`

        let resultGravadura = await prisma.$executeRawUnsafe(sql)

        if (resultGravadura)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
//Função para retornar todas as musicas no banco de dados 
const selectAllGravadora = async function () {
    try {
        let sql = 'select * from tbl_gravadora order by id desc'
        //Encaminha o script sql para o BD 
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result//Retorna os dados do Banco
        else
            return false

    } catch (error) {
        return false
    }
}
//Função para listar uma musica pelo id 
const selectByIdGravadora = async function (ID) {
    try {
        let sql = `select * from tbl_gravadora where id = ${ID}`
        //Encaminha o script sql para o BD 

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result//Retorna os dados do Banco
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {

    insertGravadora,
    selectAllGravadora,
    selectByIdGravadora,
    deleteGravadora,
    updateGravadora

}
