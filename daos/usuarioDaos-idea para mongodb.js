// const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');
const usuarioSchema = require('./modelsMDB/schemaUsuarios')


class Usuarios{
    async connectMDB() {
        try{
          //  const URL = "mongodb+srv://salo:tako@cluster0.51jwcs4.mongodb.net/test"
           let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUniFiedTopology: true
        })
        }catch (e) {
      console.log(e);

    }
}






}

module.exports = Usuarios