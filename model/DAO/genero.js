/**************************************************************
 * Objetivo : Criar o CRUD de dados da tabela de musica no banco de dados 
 * Data : 11/02/2025
 * Autor : Marcel
 * Versão : 1.0  
***************************************************************/
//Import da biblioteca do prisma client para realizar as ações no Banco de Dados 
const { prismaClient, PrismaClient } = require('@prisma/client')

//Função para inserir um novo genero
const insertGenero = async function (genero) {
    //Instancia da classe do prisma client(cria um objeto)
    const prisma = new PrismaClient()
    let sql = ` insert into tbl_genero (nome  
)
                         values(
                                '${genero.nome}'
                                
                          )`
    //Executa o script SQL no banco de dados e aguarda o resultado (true ou false)
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}
const updateGenero = async function () {
    try {
        let sql = `update tbl_genero set nome = ${genero.nome} `

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}
const deleteGenero = async function () {
    try {
        let sql = `delete from tbl_genero where id = ${id}`

        let resultGenero = await prisma.$executeRawUnsafe(sql)

        if (resultGenero)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllMGenero = async function () {
    try {
        let sql = 'select * from tbl_genero order by id desc'
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
const selectByIdGenero = async function () {
    try {
        let sql = `select * from tbl_genero where id = ${ID}`
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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllMGenero,
    selectByIdGenero


}
