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
  cartRouter.delete('/:id', (req, res) => {
    const { id } = req.params;  
  

    cart.deleteCarritoById(id).then((response) => {
      res.json({ result: response })
    })
  });


  //GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS OK
  cartRouter.get('/:id/productos', (req, res) => {
  let { id } = req.params;

  // id = parseInt(id)
  cartRouter.getProductsByCart(id).then((respuesta) => {
    res.json(respuesta);
  });
})



//AGREGO PRODUCTOS AL CARRITO OK

cartRouter.post('/:id/productos', (req, res) => {
  const {id} = req.params;
  const { body } = req;
  const { nombre, descripcion, codigo, foto, precio, stock } = body
  const insertProducts = { id: body.id, nombre, descripcion, codigo, foto, precio, stock };
  //  const {fecha, nombre, descripcion, codigo, foto, precio, stock } = req.body


  cart.agregarProducto(id, insertProducts).then((response) =>{
             res.json(response)
         })

 });

// BORRO POR ID DE PRODUCTOS OK

cartRouter.delete('/:id/productos/:idProd', (req, res) => {
  const { id, idProd } = req.params;  
  let idEncarrito = id; 
  cart.deleteProductoDeCarrito(id, idProd, idEncarrito).then((response) => {
    res.json({ result: response })
  })
});

module.exports = cartRouter;