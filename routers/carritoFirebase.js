const Carrito = require('../daos/carritoDaos')

const express = require('express')
 const { Router } = express
const cartRouter = Router()








  const cart = new Carrito('cart')
  // cart.getAll()


  //POST DE NUEVO CARRITO CON PRODUCTOS
  cartRouter.post('/', (req, res) => {
  cart.newCarrito().then((response) =>{
            res.json(response)
        })

});


    //muestra todos los productos que estan dentro del carrito OK
    cartRouter.get("/", (req, res) => {

    cart.getAll().then((respuesta)=>{
      
    res.json(respuesta)
    }) 
  }) 




  //DELETE CON ID CARRITO OK
  cartRouter.delete('/:idC', (req, res) => {
    const { idC } = req.params;  
  

    cart.deleteCarritoById(idC).then((response) => {
      res.json({ result: response })
    })
  });


  //GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS OK
  cartRouter.get('/:idC/productos', (req, res) => {
  let { idC } = req.params;

  // id = parseInt(id)
  cartRouter.getProductsByCart(idC).then((respuesta) => {
    res.json(respuesta);
  });
})



//AGREGO PRODUCTOS AL CARRITO OK

cartRouter.post('/:idC/productos', (req, res) => {
  const {idC} = req.params;
  const { body } = req;
  const { nombre, descripcion, codigo, foto, precio, stock } = body
  const insertProducts = { idP: body.idP, nombre, descripcion, codigo, foto, precio, stock };
  //  const {fecha, nombre, descripcion, codigo, foto, precio, stock } = req.body


  cart.agregarProducto(idC, insertProducts).then((response) =>{
             res.json(response)
         })

 });

// BORRO POR ID DE PRODUCTOS OK

cartRouter.delete('/:idC/productos/:idP', (req, res) => {
  const { idC, idP } = req.params;  
  let idEncarrito = id; 
  cart.deleteProductoDeCarrito(idC, idP, idEncarrito).then((response) => {
    res.json({ result: response })
  })
});

module.exports = cartRouter;