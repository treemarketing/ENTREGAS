const express = require('express')

const app = express()
  // const { Router } = express
  // const router = Router()


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

//para usar ejs
//linea de configuracion 
app.set('view engine', 'ejs');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//defino lugar donde se van a poder ver los archivos 
app.use('/public', express.static(__dirname + '/public'));


//mongo 




//termina login con mongo


// //un middleware de validacion
// app.use((err, req, res, next) =>{
// res.status(err.status || 500);
// console.log(err.status)
// })

// function validacion (req, res, next) {
//   let admin = true;
//   if(!admin){
//     return res.status(403).send({error: "acceso no autorizado"})
//     }else{
//       console.log("acceso autorizado")
//       return next();
//     }
//   }


//RUTAS DE ROUTER CON FILE SYSTEM
  // const cartRouter = require('./routers/carritoFile')
  // const productsRouter = require('./routers/productosFile')

  const cartRouter = require('./routers/carritoFirebase')
  const productsRouter = require('./routers/productosMongo')
  const loginRouter = require('./routers/login')

app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartRouter)
app.use('/api/', loginRouter)

//control de direccion de error de paginas
app.get("*", (req, res, next) =>{
  const url = req.originalUrl;
    res.status(404).send({error: "-2", descripcion: "ruta" + url + " no autorizada"})
    next()
})





  //para usar archivos
// const fs = require('fs')

// let fecha = new Date()


//  const data = fs.readFileSync('productos.json', 'utf8');
//  let productos = JSON.parse(data)


 //creo la clase para las funciones de productos
//  class Products {
//     constructor(products){
//     this.products = [...products];
//     }
  
//   async  getAll(){
//       try{
//         const data = await fs.promises.readFile('productos.json', "utf-8")
//         let productos = JSON.parse(data);
          
//         return productos
        
//     } catch (error){
//         if(error.code == "ENOENT"){
//             fs.writeFile('productos.json',"[]", (error)=>{
//                 console.log("el archivo no pudo ser creado")
//                 return false
//             });
//             return []
//         }
       
//     }
    
// }
//       //  return this.products;
    

//     //encuentra por id
//    async findOne(id){
//       const json = await this.getAll()
//     return json.find((item)=>item.id == id)
//     }

//     async save(product){

//       try{
//           const contenidoEnJson = await this.getAll()
//           const indice = contenidoEnJson.map(x=>x.id).sort((a,b) => a - b)
//           const lastItem = indice[indice.length - 1] + 1
//           // let contenidoEnJson = JSON.parse(productos);

//           //si ya creo la variable no tengo que volver a agregar
//            let arreglo = [];
//           if (indice.length == 0){

//             arreglo = { id: 1, ...product }
//           }else{
//             arreglo =  { id: lastItem, ...product }
//           }  
//           // this.products.push(product)
//           contenidoEnJson.push(arreglo)

//           await fs.promises.writeFile('productos.json', JSON.stringify(contenidoEnJson))
//           return contenidoEnJson;
//           // asigna un id para que no sea null. 
//           // if (!objeto.id){
//           //     objeto.id= +1
//           //     arreglo = [{...objeto}]
//           //     await fs.promises.writeFile('productos.json', JSON.stringify(arreglo))
//           //     return arreglo[0].id
//           // }

      
//       }catch(error){
//           console.log("No se pudo grabar el archivo")
//       }
  
//   }

//   async update(objeto){
//     const json = await this.getAll()
//     const producToChange = json.find((o) => o.id == objeto.id)

//     if(producToChange){
//         try{
//           producToChange.nombre = objeto.nombre
//           producToChange.descripcion = objeto.descripcion
//           producToChange.codigo = objeto.codigo
//           producToChange.foto = objeto.foto
//           producToChange.precio = objeto.precio
//           producToChange.stock = objeto.stock
          
//             //hago que vuelva a grabar todo pero con los cambios introducitos en la constante
//             await fs.promises.writeFile('productos.json', JSON.stringify(json))                
//             return producToChange
//         } catch(error){
//             return false
//         }
//     } else{
//         return false
//     }
// }

//   async delete(id){
//     const json = await this.getAll()
//     const filterJson = json.filter((e) => e.id != id)

//     try{
//         if(json.length != filterJson.length){
//             await fs.promises.writeFile('productos.json', JSON.stringify(filterJson))
//             return true
//         } else{
//             return false
//         }
//     } catch(error){
//         return false
//     }
//   }
// }

// const product = new Products ("product")

// //muestra todos los productos
// router.get("/productos", validacion, async (req, res) => {
//      await product.getAll().then((respuesta)=>{
      
//      res.json(respuesta)
//      }) 
     
//     //  res.json(products.getAll())
// })


// //GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
// router.get('/productos/:id', validacion, async (req, res) => {
//     let { id } = req.params;
//     // id = parseInt(id)
//     await product.findOne(id).then((respuesta)=>{
//       const encontrar = respuesta
      
//       if (encontrar){
//           res.json(encontrar)
//       }else{
//       res.json({error: "producto no encontrado"})
//       }
//     });
//     })
//     // const products = new Products(productos)

   
// //me estoy quedando con respuesta del 1 ver como hago para pasar todo 
  
//   router.post('/productos',validacion, async (req, res) => {
//     const {body} = req;
//           console.log(body)
//           let insertBody = {fecha: fecha.toLocaleDateString(), nombre: body.nombre, descripcion: body.descripcion, codigo:body.codigo, foto: body.foto, precio: body.precio, stock: body.stock}
//           await product.save(insertBody).then((respuesta)=>{
//             res.json(respuesta);
//   });
// })


// //PUT CON ID PARAMS SIEMPRE y BODY!
// router.put('/productos/:id',validacion, (req, res) => {
//     const { id } = req.params;
//     const { body } = req;
//     const { nombre, descripcion, codigo, foto, precio, stock } = body
//     console.log(body.id)
//     const p = { id, nombre, descripcion, codigo, foto, precio, stock };
      
//       product.update(p).then((respuesta)=>{

//         res.json({ sucess: "ok", new: respuesta})
//       })
//   }) 
 

// //ver si tengo que darle cambio en el archivo tambien com

//   //DELETE CON ID ESCRIBIENDO EN EL ARCHIVO 
//   router.delete('/productos/:id',validacion, (req, res) => {
//     const { id } = req.params;  
   
//     product.delete(id).then((response) => {
//       res.json({ result: response })
//     })
//   });






//   //me fijo si ya tengo creado el archivo sino lo creo ACA TENGO QUE CREAR UN ID POR CARRITO
//   class Cart {
//     constructor(carts){
//     this.carts = [...carts];
//     }

//     async  getAll(){
//       try{
//         const data = await fs.promises.readFile('carrito.json', "utf-8")
//         let carritos = JSON.parse(data);
          
//         return carritos
        
//     } catch (error){
//         if(error.code == "ENOENT"){
//             fs.writeFile('carrito.json',"[]", (error)=>{
//                 console.log("el archivo no pudo ser creado")
//                 return false
//             });
//             return []
//         }
       
//     }
// }


// async save(){
//   let arreglo = {};
//   try{
//       const contenidoEnJson = await this.getAll()
//       console.log(contenidoEnJson)
//       const indice = contenidoEnJson.map(x=>x.id).sort((a,b) => a - b)
//       const lastItem = indice[indice.length - 1] + 1

    
    
      
//       if (indice.length == 0){

//         arreglo = { id: 1, ...arreglo}
//       }else{
//         arreglo =  { id: lastItem, ...arreglo }
//       }  

//        arreglo.timestamp = new Date()
//        arreglo.productos = [];


//       contenidoEnJson.push(arreglo)

//       await fs.promises.writeFile('carrito.json', JSON.stringify(contenidoEnJson))
//       return arreglo.id;

  
//   }catch(error){
//       console.log("No se pudo grabar el archivo")
//   }

// }
//   async delete(id){
//   const json = await this.getAll()
//   const filterJson = json.filter((e) => e.id != id)

//   try{
//       if(json.length != filterJson.length){
//           await fs.promises.writeFile('carrito.json', JSON.stringify(filterJson))
//           return true
//       } else{
//           return false
//       }
//   } catch(error){
//       return false
//   }
// }


// async getProductsByCart(id){
//   const json = await this.getAll()
//   const cartFound = json.find((e) => e.id == id)

//   if(cartFound){
//       if(cartFound.productos){
//           return cartFound.productos
//       } else{
//           return null
//       }
//   } else{
//       return null
//   }        
// }


// async addToCart(id, objeto){
//   const json = await this.getAll()
//   const cartFound = json.find((e) => e.id == id)

//   if(cartFound){
//       try{
//           cartFound.productos.push(objeto)

//           await fs.promises.writeFile('carrito.json', JSON.stringify(json))
//           return true
//       } catch(error){
//           return false
//       }
//   } else{
//       return false
//   }
// }


// async deleteProductOnCart(cartId, productId){
//   const json = await this.getAll()
//   const cartFound = json.find((e) => e.id == cartId)

//   const filterCart = cartFound.productos.filter((p) => p.id != productId)
//   cartFound.products = filterCart

//   try{
//       if(cart.length != filterCart.length){
//           await fs.promises.writeFile('carrito.json', JSON.stringify(json))
//           return true
//       } else{
//           return false
//       }
//   } catch(error){
//       return false
//   }
// }

//   }    

//   //export default Cart
//   module.exports = Cart



//   const cart = new Cart('cart')
//   cart.getAll()


// router.post('/carrito', (req, res) => {
//  cart.save().then((response) =>{
//             res.json(response)
//         })

// });


//     //muestra todos los productos que estan dentro del carrito
// router.get("/carrito", (req, res) => {

//     cart.getAll().then((respuesta)=>{
      
//     res.json(respuesta)
//     }) 
//   }) 




//   //DELETE CON ID CARRITO
//   router.delete('/carrito/:id', (req, res) => {
//     const { id } = req.params;  
//     cart.delete(id).then((response) => {
//       res.json({ result: response })
//     })
//   });


//   //GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
// router.get('/carrito/:id/productos', (req, res) => {
//   let { id } = req.params;

//   // id = parseInt(id)
//   cart.getProductsByCart(id).then((respuesta) => {
//     res.json(respuesta);
//   });
// })



// //AGREGO PRODUCTOS AL CARRITO DEL

// router.post('/carrito/:id/productos', (req, res) => {
//   const {id} = req.params;
//   const { body } = req;
//   const { nombre, descripcion, codigo, foto, precio, stock } = body
//   const insertProducts = { id: body.id, nombre, descripcion, codigo, foto, precio, stock };
//   //  const {fecha, nombre, descripcion, codigo, foto, precio, stock } = req.body


//   cart.addToCart(id, insertProducts).then((response) =>{
//              res.json(response)
//          })

//  });

// // BORRO POR ID DE PRODUCTOS

// router.delete('/carrito/:id/productos/:idProd', (req, res) => {
//   const { id, idProd } = req.params;  
//   cart.deleteProductOnCart(id, idProd).then((response) => {
//     res.json({ result: response })
//   })
// });

