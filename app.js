/***********************************************************************************
 *  Data 11/02/24 
 * Autor : Pedro Victor
 * 
 *** Para criar a API precisa instalar :
 *      express        npm install express
 *      cors           npm install cors
 *       body-parser   npm install body-parser
 *** Para criar a conexão com banco de dados precisa instalar:
 *      prisma  npm install prisma 
 *      @prisma/client npm install @prisma/client
 * 
 * Após a instalção do prisma e @prisma/client devemos: 
 *      npx prisma init ->  para inicializar o prisma no projeto 
 * Após o comando acima, voce deverá configurar o .ev e o schema.prisma, e rodas o comando :
 *      npx prisma migrate dev
 * *********************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Cria um objeto para o body do tipo JSON
const bodyParserJSON = bodyParser.json()

//Cria um objeto para criar a API
const app = express()
const controllerUsuario = require('./controller/musica/controllerUsuario.js')
const controllerGravadora = require('./controller/musica/controllerGravadora.js')
const controllerGenero = require('./controller/musica/controllerGenero.js')
const controllerMusica = require('./controller/musica/controllerMusica.js')

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS')

    app.use(cors())

    next()
})

//MUSICAS
//Endpoint para inserir musicas
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição 
    let contentType = request.headers['content-type']
    //Recebe os dados da requisição 
    let dadosBody = request.body

    //Chama função da controller para inserir os dados e aguarda o retorno da função 
    let resultMusica = await controllerMusica.inserirMusica(dadosBody, contentType)
    response.status(resultMusica.status_code)
    response.json(resultMusica)

})
//Endpoint para listar as musicas
app.get('/v1/controle-musicas/musica', cors(), async function (request, response) {
    let resultMusica = await controllerMusica.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})
//Endpoint para buscar musicas
app.get('/v1/controle-musicas/musicaID/:id', cors(), async function (request, response) {


    let id = request.params.id
    let resultMusica = await controllerMusica.buscarMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)


})
//Endpoint para deletar musicas
app.delete('/v1/controle-musicas/deleteMusica/:id', cors(), async function (request, response) {
    let id = request.params.id

    let resultMusica = await controllerMusica.excluirMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function (request, response) {


    //Recebe o id da musica
    let idMusica = request.params.id


    //receber os dados da requisiçao 
    let dadosBody = request.body

    //Recebe o content type 
    let contentType = request.headers['content-type']





    let resultMusica = await controllerMusica.atualizarMusica(idMusica, dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//GENEROS
//Endpoint para inserir generos
app.post('/v1/controle-generos/genero', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição 
    let contentType = request.headers['content-type']
    //Recebe os dados da requisição 
    let dadosBody = request.body

    //Chama função da controller para inserir os dados e aguarda o retorno da função 
    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)
    response.status(resultGenero.status_code);
    response.json(resultGenero);

})

app.get('/v1/controle-generos/genero', cors(),async function (request, response) {
    let resultGenero = await controllerGenero.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})
app.get('/v1/controle-generos/generosID/:id', cors(), async function (request, response) {


    let id = request.params.id
    let resultGenero = await controllerGenero.buscarGenero(parseInt(id))

    response.status(resultGenero.status_code)
    response.json(resultGenero)


})
//Endpoint para deletar um genero(por id)
app.delete('/v1/controle-generos/deleteGenero/:id', cors(), async function (request, response) {
    let id = request.params.id

    let resultGenero = await controllerGenero.excluirGenero(id)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})
app.put('/v1/controle-generos/genero/:id', cors(), bodyParserJSON, async function (request, response) {


    //Recebe o id do gener
    let idGenero = request.params.id


    //receber os dados da requisiçao 
    let dadosBody = request.body

    //Recebe o content type 
    let contentType = request.headers['content-type']

    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//GRAVADORAS
//inserir gravadoras
app.post('/v1/controle-gravadoras/gravadora', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição 
    let contentType = request.headers['content-type']
    //Recebe os dados da requisição 
    let dadosBody = request.body

    //Chama função da controller para inserir os dados e aguarda o retorno da função 
    let resultGravadora = await controllerGravadora.inserirGravadora(dadosBody, contentType)
    response.status(resultGravadora.status_code)
    response.json(resultGravadora)

})
//Endpoint para listar as gravadoras
app.get('/v1/controle-gravadoras/gravadora', cors(), bodyParserJSON, async function (request, response) {
    let resultGravadora = await controllerGravadora.listarGravadora()

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})
//Endpoint para buscar gravadoras
app.get('/v1/controle-gravadoras/gravadoraID/:id', cors(), bodyParserJSON, async function (request, response) {


    let id = request.params.id
    let resultGravadora = await controllerGravadora.buscarGravadora(id)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)


})
//Endpoint para deletar gravadoras
app.delete('/v1/controle-gravadoras/deleteGravadora/:id', cors(), async function (request, response) {
    let id = request.params.id

    let resultGravadora = await controllerGravadora.excluirGravadora(id)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

app.put('/v1/controle-gravadoras/gravadora/:id', cors(), bodyParserJSON, async function (request, response) {


    //Recebe o id da musica
    let idGravadora = request.params.id


    //receber os dados da requisiçao 
    let dadosBody = request.body

    //Recebe o content type 
    let contentType = request.headers['content-type']





    let resultGravadora = await controllerGravadora.atualizarGravadora(idGravadora, dadosBody, contentType)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

//Usuarios
//Adicionar users
app.post('/v1/controle-usuarios/usuario', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição 
    let contentType = request.headers['content-type']
    //Recebe os dados da requisição 
    let dadosBody = request.body

    //Chama função da controller para inserir os dados e aguarda o retorno da função 
    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)
    response.status(resultUsuario.status_code)
    response.json(resultUsuario)

})
//Endpoint para listar as musicas
app.get('/v1/controle-usuarios/usuario', cors(), bodyParserJSON, async function (request, response) {
    let resultUsuario = await controllerUsuario.listarUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})
//Endpoint para buscar musicas
app.get('/v1/controle-usuarios/usuarioID/:id', cors(), bodyParserJSON, async function (request, response) {


    let id = request.params.id
    let resultUsuario = await controllerUsuario.buscarUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)


})
//Endpoint para deletar musicas
app.delete('/v1/controle-usuarios/deleteUsuario/:id', cors(), async function (request, response) {
    let id = request.params.id

    let resultUsuario = await controllerMusica.excluirMusica(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.put('/v1/controle-usuarios/usuario/:id', cors(), bodyParserJSON, async function (request, response) {


    //Recebe o id da musica
    let idUsuario = request.params.id


    //receber os dados da requisiçao 
    let dadosBody = request.body

    //Recebe o content type 
    let contentType = request.headers['content-type']





    let resultUsuario = await controllerUsuario.atualizarUsuario(idUsuario, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.listen(8080, function () {
    console.log('API aguardando requisições...')
})