const express = require('express')

const app = express()
const { Router } = express
const router = Router()


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//defino lugar donde se van a poder ver los archivos 
app.use('/public', express.static(__dirname + '/public'));





//un middleware de validacion
app.use((err, req, res, next) =>{
res.status(err.status || 500);
console.log(err.status)

})

function validacion (req, res, next) {
  let admin = true;
  if(!admin){
    return res.status(403).send({error: "acceso no autorizado"})
    }else{
      console.log("acceso autorizado")
      return next();
    }
  }





app.use('/api/', router)

//control de direccion de error de paginas
app.get("*", (req, res, next) =>{
  const url = req.originalUrl;
    res.status(404).send({error: "-2", descripcion: "ruta" + url + " no autorizada"})
    next()
})



//una forma de agregar error
// app.get("*", (req,res) =>{
  //   res.send("error")
  // })


  //para usar archivos
const fs = require('fs')

let fecha = new Date()


//  const data = fs.readFileSync('productos.json', 'utf8');
//  let productos = JSON.parse(data)


 //creo la clase para las funciones de productos
 class Products {
    constructor(products){
    this.products = [...products];
    }
  
  async  getAll(){
      try{
        const data = await fs.promises.readFile('productos.json', "utf-8")
        let productos = JSON.parse(data);
          
        return productos
        
    } catch (error){
        if(error.code == "ENOENT"){
            fs.writeFile('productos.json',"[]", (error)=>{
                console.log("el archivo no pudo ser creado")
                return false
            });
            return []
        }
       
    }
    
}
      //  return this.products;
    

    //encuentra por id
   async findOne(id){
      const json = await this.getAll()
    return json.find((item)=>item.id == id)
    }

    async save(product){
      try{
          const contenidoEnJson = await this.getAll()
          const indice = contenidoEnJson.map(x=>x.id).sort()
          const lastItem = indice[indice.length - 1] + 1
          // let contenidoEnJson = JSON.parse(productos);

          //si ya creo la variable no tengo que volver a agregar
          let arreglo = []
          
          
         
          
          // let lastId = 1;
          // if (lastItem){
          //   lastId = lastItem.id + 1;
            
          // }
          // product.id = lastId
          // arreglo = [{...product}]
          //PARTE QUE ME FALTABA
          if (indice.length == 0){

            arreglo = { id: 1, ...product }
          }else{
            arreglo =  { id: lastItem, ...product }
          }  
          // this.products.push(product)
          contenidoEnJson.push(arreglo)

          await fs.promises.writeFile('productos.json', JSON.stringify(contenidoEnJson))
          return contenidoEnJson;
          // asigna un id para que no sea null. 
          // if (!objeto.id){
          //     objeto.id= +1
          //     arreglo = [{...objeto}]
          //     await fs.promises.writeFile('productos.json', JSON.stringify(arreglo))
          //     return arreglo[0].id
          // }

      
      }catch(error){
          console.log("No se pudo grabar el archivo")
      }
  
  }

  async update(objeto){
    const json = await this.getAll()
    const producToChange = json.find((o) => o.id == objeto.id)

    if(producToChange){
        try{
          producToChange.nombre = objeto.nombre
          producToChange.descripcion = objeto.descripcion
          producToChange.codigo = objeto.codigo
          producToChange.foto = objeto.foto
          producToChange.precio = objeto.precio
          producToChange.stock = objeto.stock
          
          
            await fs.promises.writeFile('productos.json', JSON.stringify(json))                
            return producToChange
        } catch(error){
            return false
        }
    } else{
        return false
    }
}


}

const product = new Products ("product")

//muestra todos los productos
router.get("/productos", validacion, async (req, res) => {
     await product.getAll().then((respuesta)=>{
      
     res.json(respuesta)
     }) 
     
    //  res.json(products.getAll())
})


//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
router.get('/productos/:id', validacion, async (req, res) => {
    let { id } = req.params;
    // id = parseInt(id)
    await product.findOne(id).then((respuesta)=>{
      const encontrar = respuesta
      

      // const encontrar = products.findOne(id)
      if (encontrar){
          res.json(encontrar)
      }else{
      res.json({error: "producto no encontrado"})
      }
    });
    })
    // const products = new Products(productos)

   
//me estoy quedando con respuesta del 1 ver como hago para pasar todo 
  
  router.post('/productos',validacion, async (req, res) => {
    const {body} = req;
    
    
          let insertBody = {  fecha:fecha.toLocaleDateString(), nombre: body.nombre, descripcion: body.descripcion, codigo:body.codigo, foto: body.foto, precio: body.price, stock: body.stock}
          await product.save(insertBody).then((respuesta)=>{
            console.log(respuesta)
            res.json(respuesta);
            

    // const lastId = respuesta[respuesta.length - 1];
    
    //agrego bien el body y agrego un id nuevo le agrego fecha
    // let nuevoId = lastId.id + 1;
    
    // respuesta.push(insertBody);
    //grabo el inserbody en productos.json
    // fs.promises.writeFile('productos.json', JSON.stringify(insertBody));
    //terminar con la respuesta
    
  });
})


//PUT CON ID PARAMS SIEMPRE y BODY!
router.put('/productos/:id',validacion, (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { nombre, descripcion, codigo, foto, precio, stock } = body
    const p = { id, nombre, descripcion, codigo, foto, precio, stock };
      
      product.update(p).then((respuesta)=>{

        res.json({ sucess: "ok", new: respuesta})
      })
      }) 
 

//ver si tengo que darle cambio en el archivo tambien com

  //DELETE CON ID ESCRIBIENDO EN EL ARCHIVO 
  router.delete('/productos/:id',validacion, (req, res) => {
    const { id } = req.params;  
    const productsFilteredById = productos.filter((item)=> item.id != id)
    //si quiero puedo guardar este en el productos.json actualizando 
    productos = []
    fs.writeFileSync('productos.json', JSON.stringify(productos))
    productos.push(productsFilteredById)
    console.log(productos)
    fs.writeFileSync('productos.json', JSON.stringify(productos))
    res.json("borrado")
  });



//   ///CARRITO CREAR ARCHIVO 
//   async function getData(){
//     try{
//         return await fs.promises.readFile("carrito.json", "utf-8");
//     } catch (error){
//         if(error.code == "ENOENT"){
          
//             fs.writeFile(nuevoId+".json", "[]", (error)=>{
//             if(error){
//                 console.log("el archivo no pudo ser creado")
//             }
//         })
       
//     }
    
// }


  //me fijo si ya tengo creado el archivo sino lo creo ACA TENGO QUE CREAR UN ID POR CARRITO

router.post('/', (req, res) => {
  const {body} = req;
  const lastId = carrito[carrito.length - 1];
  let nuevoId = lastId.id + 1;
 let nuevoCarrito = {id: nuevoId, fecha:fecha.toLocaleDateString()  }
 carrito.push(nuevoCarrito)

});


 

  //leo el archivo de carrito 
  const dataCarrito = fs.readFileSync('carrito.json', 'utf8');
    let carrito = JSON.parse(dataCarrito)

    //muestra todos los productos que estan dentro del carrito
router.get("/carrito", (req, res) => {
    const products = new Products (carrito)
    res.json(products.getAll())
})


  //POST CARRITO ID 


  //DELETE CON ID CARRITO
  router.delete('/carrito/:id', (req, res) => {
    const { id } = req.params;  
    const carritoFilteredById = productos.filter((item)=> item.id != id)
    //si quiero puedo guardar este en el carrito.json actualizando 
    console.log(carritoFilteredById)
    res.json("borrado")
  });


  //GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
router.get('/carrito/:id/productos', (req, res) => {
  let { id } = req.params;
  const products = new Products(carrito)
  id = parseInt(id)

  const encontrar = products.findOne(id)
  if (encontrar){
      res.json(encontrar)
  }else{
  res.json({error: "producto no encontrado"})
  }
});

//POST en el carrito

router.post('/carrito/:id/productos', (req, res) => {
  const {body} = req;
  const lastId = carrito[carrito.length - 1];
  
  //agrego bien el body y agrego un id nuevo
  let nuevoId = lastId.id + 1;
  let insertBody = {id: nuevoId, fecha: fecha.toLocaleDateString(), nombre: body.nombre, descripcion: body.descripcion, codigo:body.codigo, foto: body.foto, precio: body.price, stock: body.stock}
  carrito.push(insertBody);
  fs.writeFileSync('productos.json', JSON.stringify(carrito))
});
//tengo que ver como darle que escriba en los archivos y agregue el insertbody


  //DELETE CON ID CARRITO POR PRODUCTO
  // router.delete('/carrito/:id/productos/:id_prod', (req, res) => {
  //   const { id } = req.params;
  //   const {id_prod} = req.params;

  //   const productoFilteredById = productos.filter((item)=> item.id != id_prod)
  //   const carritoFilteredById = productos.filter((item)=> item.id != id)
  //   //si quiero puedo guardar este en el carrito.json actualizando 
  //   console.log(carritoFilteredById)
  //   console.log(productoFilteredById)
  //   res.json("borrado")
  // 



