
/**************************************************************
 * Objetivo : Criar o CRUD de dados da tabela de musica no banco de dados 
 * Data : 11/02/2025
 * Autor : Marcel
 * Versão : 1.0  
***************************************************************/
//Import da biblioteca do prisma client para realizar as ações no Banco de Dados 
const { prismaClient, PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client(cria um objeto)
const prisma = new PrismaClient()

//Função para inserir uma nova musica 
const insertUsuario = async function (usuario) {
    try {


        let sql = ` insert into tbl_usuario (nome, 
                         email, )
                         values(
                                '${usuario.nome}',
                                '${usuario.email}',
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
const updateUsuario = async function (musica) {
    try {
        let sql = `update tbl_usuario set nome =' ${usuario.nome}',
                                    email = '${usuario.email}',
                                    where id = ${usuario.id}`

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
const deleteUsuario = async function (id) {
    try {
        let sql = `delete from tbl_usuario where id = ${id}`

        let resultUsuario = await prisma.$executeRawUnsafe(sql)

        if (resultUsuario)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
//Função para retornar todas as musicas no banco de dados 
const selectAllUsuario = async function () {
    try {
        let sql = 'select * from tbl_usuario order by id desc'
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
//Função para listar um usuario pelo id 
const selectByIdUsuario = async function (id) {
    try {
        let sql = `select * from tbl_usuario where id = ${id}`
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

    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario

}
