/**************************************************************
 * Objetivo : Criar o CRUD de dados da tabela de musica no banco de dados 
 * Data : 11/02/2025
 * Autor : Pedro Victor
 * Versão : 1.0  
***************************************************************/
//Import da biblioteca do prisma client para realizar as ações no Banco de Dados 
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
//Função para inserir um novo genero
const insertGenero = async function (genero) {
    //Instancia da classe do prisma client(cria um objeto)

    let sql = ` insert into tbl_genero (
    nome 
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
const updateGenero = async function (genero) {
    try {
        let sql = `UPDATE tbl_genero SET nome = '${genero.nome}' WHERE id = ${genero.id}`;



        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}
const deleteGenero = async function (id) {
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
const selectAllGenero = async function () {
    try {
        let sql = 'SELECT * FROM tbl_genero ORDER BY id DESC'
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

const selectByIdGenero = async function (id) {
    try {
        let sql = `select * from tbl_genero where id = ${id}`
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
    selectAllGenero,
    selectByIdGenero


}
