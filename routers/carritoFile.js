const Cart = require('../daos/bd/cart.js')

const express = require('express')
 const { Router } = express
const cartRouter = Router()








  const cart = new Cart('cart')
  cart.getAll()

  cartRouter.post('/', (req, res) => {
 cart.save().then((response) =>{
            res.json(response)
        })

});


    //muestra todos los productos que estan dentro del carrito
    cartRouter.get("/", (req, res) => {

    cart.getAll().then((respuesta)=>{
      
    res.json(respuesta)
    }) 
  }) 




  //DELETE CON ID CARRITO
  cartRouter.delete('/:id', (req, res) => {
    const { id } = req.params;  
    cart.delete(id).then((response) => {
      res.json({ result: response })
    })
  });


  //GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
  cartRouter.get('/:id/productos', (req, res) => {
  let { id } = req.params;

  // id = parseInt(id)
  cartRouter.getProductsByCart(id).then((respuesta) => {
    res.json(respuesta);
  });
})



//AGREGO PRODUCTOS AL CARRITO DEL

cartRouter.post('/:id/productos', (req, res) => {
  const {id} = req.params;
  const { body } = req;
  const { nombre, descripcion, codigo, foto, precio, stock } = body
  const insertProducts = { id: body.id, nombre, descripcion, codigo, foto, precio, stock };
  //  const {fecha, nombre, descripcion, codigo, foto, precio, stock } = req.body


  cart.addToCart(id, insertProducts).then((response) =>{
             res.json(response)
         })

 });

// BORRO POR ID DE PRODUCTOS

cartRouter.delete('/:id/productos/:idProd', (req, res) => {
  const { id, idProd } = req.params;  
  cart.deleteProductOnCart(id, idProd).then((response) => {
    res.json({ result: response })
  })
});

module.exports = cartRouter;