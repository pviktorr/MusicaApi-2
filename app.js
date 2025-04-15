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

const controllerGenero = require ('./controller/musica/controllerGenero.js')
const controllerMusica = require ('./controller/musica/controllerMusica.js')

app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin','*')
    response.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE,OPTIONS')

    app.use(cors())

    next()
})
//Endpoint para inserir musicas
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição 
   let contentType = request.headers['content-type']
    //Recebe os dados da requisição 
    let dadosBody = request.body

    //Chama função da controller para inserir os dados e aguarda o retorno da função 
    let resultMusica = await controllerMusica.inserirMusica(dadosBody,contentType)
    response.status(resultMusica.status_code)
    response.json(resultMusica)

})
//Endpoint para listar as musicas
app.get('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function (request, response) {
    let resultMusica = await controllerMusica.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})
//Endpoint para buscar musicas
app.get('/v1/controle-musicas/musicaID/:id', cors(), bodyParserJSON, async function (request,response) {
    

    let id =  request.params.id 
    let resultMusica = await controllerMusica.buscarMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)


})
//Endpoint para deletar musicas
app.delete('/v1/controle-musicas/deleteMusica/:id',cors(), async function (request,response) {
    let id = request.params.id

    let resultMusica = await controllerMusica.excluirMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.put('/v1/controle-musicas/musica/:id',cors(), bodyParserJSON, async function (request,response){


    //Recebe o id da musica
    let idMusica = request.params.id


    //receber os dados da requisiçao 
    let dadosBody = request.body

    //Recebe o content type 
    let contentType = request.headers['content-type']

   

   

    let resultMusica = await controllerMusica.atualizarMusica(idMusica,dadosBody,contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//Endpoint para inserir generos
app.post('/v1/controle-generos/genero', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição 
   let contentType = request.headers['content-type']
    //Recebe os dados da requisição 
    let dadosBody = request.body

    //Chama função da controller para inserir os dados e aguarda o retorno da função 
    let resultGenero = await controllerGenero.inserirGenero(dadosBody,contentType)
    response.status(resultGenero.status_code)
    response.json(resultGenero)

})
app.get('/v1/controle-generos/genero', cors(), bodyParserJSON, async function (request, response) {
    let resultGenero = await controllerGenero.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})
app.get('/v1/controle-generos/generosID/:id', cors(), bodyParserJSON, async function (request,response) {
    

    let id =  request.params.id 
    let resultGenero = await controllerGenero.buscarGenero(id)

    response.status(resultGenero.status_code)
    response.json(resultGenero)


})
//Endpoint para deletar um genero(por id)
app.delete('/v1/controle-generos/deletegenero/:id',cors(), async function (request,response) {
    let id = request.params.id

    let resultGenero = await controllerGenero.excluirGenero(id)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})
app.put('/v1/controle-generos/genero/:id',cors(), bodyParserJSON, async function (request,response){


    //Recebe o id do gener
    let idGenero = request.params.id


    //receber os dados da requisiçao 
    let dadosBody = request.body

    //Recebe o content type 
    let contentType = request.headers['content-type']

   

   

    let resultGenero = await controllerGenero.atualizarGenero(idGenero,dadosBody,contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})



app.listen(8080, function(){
    console.log('API aguardando requisições...')
})