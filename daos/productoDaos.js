// const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');
const esquemaProd = require('./modelsMDB/schemaProducto')


const {MONGOURL} = require("../config")
const URL = MONGOURL




class Producto{
    async connectMDB() {
        try{
           //const URL = "mongodb+srv://salo:tako@cluster0.51jwcs4.mongodb.net/test"
           let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUniFiedTopology: true
        })
        }catch (e) {
      console.log(e);

    }
}

async save(producto){
    try{
        let tiempo = new Date()
        await this.connectMDB()
         producto.fecha = tiempo.toString()
         
        await esquemaProd.create(producto)
        const id = producto.idP
        console.log(id)
        mongoose.disconnect()
        return id
    }catch (error){
        throw Error(error.message)
    }
}

async getAll(){
    try{
        await this.connectMDB()
        const prod = await esquemaProd.find({})
        mongoose.disconnect()
        return prod

    }catch (error){
        throw Error(error.message)
}
}


async getById(id){
    try{
        await this.connectMDB()
        const prodId = await esquemaProd.findById(id)
        mongoose.disconnect()
        return prodId

    }catch (error){
        throw Error(error.message)
    }
}

async changeById(id, cambio){
    try{
        await this.connectMDB()
        //con este esquema hay que resolver ahora 
        const nuevo = await esquemaProd.updateOne({_id: String(id)}, {$set:cambio})
        mongoose.disconnect()
        console.log(nuevo)
        return nuevo
    }catch (error){
        throw Error(error.message)
}
}

async deleteById(id){
    try{
        await this.connectMDB()
        const borrar = await esquemaProd.deleteOne({_id: String(id)})
        mongoose.disconnect()
        return borrar
    }catch (error){
        throw Error(error.message)
}
}





}

module.exports = Producto