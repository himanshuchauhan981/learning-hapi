const Hapi = require('hapi');
const mongoose = require('mongoose');
const DogController = require('./controllers/dog')
const MongoDBUrl = 'mongodb://localhost:27017/dogapi';

const server = new Hapi.Server({
    port: 3000,
    host:'localhost'
})

server.route({
    path:'/dog',
    method:'POST',
    handler: DogController.create
})

server.route({
    path:'/dogs/{id}',
    method:'GET',
    handler: DogController.get
})

server.route({
    path:'/dogs/{id}',
    method:'PUT',
    handler: DogController.update
})

async function start(){
    try{
        await server.start();
        mongoose.connect(MongoDBUrl).then(()=>console.log('MongoDB connection is successfull'))
        console.log(`Server is running at ${server.info.uri}`)
    }
    catch(error){
        console.log(error)
    }
}

start()