import mongoose from "mongoose";




const schemaProducto = new mongoose.Schema({
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true, max: 100 },
    codigo: { type: Number, required: true, max: 100},
    foto : { type: String, required: true },
    stock : { type: Number, required: true },
    idP : { type: Number, required: true },
    idC : { type: Number, required: true },
    time : { type: String, required: true },

  });
  
module.exports = mongoose.model('Producto', schemaProducto);