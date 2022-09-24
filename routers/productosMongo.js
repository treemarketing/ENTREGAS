const express = require('express')
const Producto = require('../daos/productoDaos')
const { Router } = express

const productsRouter = Router()





function validacion (req, res, next) {
      let admin = true;
      if(!admin){
        return res.status(403).send({error: "acceso no autorizado"})
        }else{
          console.log("acceso autorizado")
          return next();
        }
       }



let fecha = new Date()
const product = new Producto ("product")
//muestra todos los productos
productsRouter.get("/", validacion, async (req, res) => {
    await product.getAll().then((respuesta)=>{
     
    res.json(respuesta)
    }) 
})


//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
productsRouter.get('/:id', validacion, async (req, res) => {
   let { id } = req.params;
   await product.findOne(id).then((respuesta)=>{
     const encontrar = respuesta
     
     if (encontrar){
         res.json(encontrar)
     }else{
     res.json({error: "producto no encontrado"})
     }
   });
   })


  
//me estoy quedando con respuesta del 1 ver como hago para pasar todo 
 
productsRouter.post('/',validacion, async (req, res) => {
   const {body} = req;
         let insertBody = {fecha: fecha.toLocaleDateString(), nombre: body.nombre, descripcion: body.descripcion, codigo:body.codigo, foto: body.foto, precio: body.precio, stock: body.stock}
         await product.save(insertBody).then((respuesta)=>{
           res.json(respuesta);
 });
})


//PUT CON ID PARAMS SIEMPRE y BODY!
productsRouter.put('/:id',validacion, (req, res) => {
   const { id } = req.params;
   let idProd = parseInt(id)
   const { body } = req;
   const { nombre, descripcion, codigo, foto, precio, stock } = body
   console.log(body.id)
   const cambio = { id, nombre, descripcion, codigo, foto, precio, stock };
     
     product.changeById(idProd, cambio).then((respuesta)=>{

       res.json({ sucess: "ok", new: respuesta})
     })
 }) 


//ver si tengo que darle cambio en el archivo tambien com

 //DELETE CON ID ESCRIBIENDO EN EL ARCHIVO 
 productsRouter.delete('/:id',validacion, (req, res) => {
   const { id } = req.params;  
   let idProd = parseInt(id)   
   product.deleteById(idProd).then((response) => {
     res.json({ result: response })
   })
 });

 module.exports = productsRouter