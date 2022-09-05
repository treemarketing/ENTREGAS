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
let admin = true;
function validacion (req, res, next) {
  
  if(admin = true){
    console.log("acceso permitido")
    }
    next();
  }





app.use('/api/', router)

//control de direccion de error de paginas
app.use((req, res, next) =>{
  const url = req.originalUrl;
    res.status(404).send({error: "-1", descripcion: "ruta" + url + " no autorizada"})
    next()
})



//una forma de agregar error
// app.get("*", (req,res) =>{
  //   res.send("error")
  // })


  //para usar archivos
const fs = require('fs')

let fecha = new Date()

const data = fs.readFileSync('productos.json', 'utf8');
let productos = JSON.parse(data)


 //creo la clase para las funciones de productos
 class Products {
    constructor(products){
    this.products = [...products];
    }
  
    getAll(){
      return this.products;
    }

    //encuentra por id
    findOne(id){
    return this.products.find((item)=>item.id == id)
    }

    async save(product){
      try{
          
          let contenidoEnJson = JSON.parse(productos);
          let arreglo = []
          //esto lo hago para obtener el ultimo numero de id ordenado
          const indice = contenidoEnJson.map(x=>x.id).sort()
          // para que sume a partir de el ultimo id 1+
          const lastItem = this.products[this.products.length - 1]
          let lastId = 1;
          if (lastItem){
            lastId = lastItem.id + 1;
            
          }
          product.id = lastId
          arreglo = [{...product}]
          // this.products.push(product)
          contenidoEnJson.push(product)

          await fs.promises.writeFile('productos.json', JSON.stringify(contenidoEnJson))
          return this.products[this.products.length - 1];
          // asigna un id para que no sea null. 
          // if (!objeto.id){
          //     objeto.id= +1
          //     arreglo = [{...objeto}]
          //     await fs.promises.writeFile('productos.json', JSON.stringify(arreglo))
          //     return arreglo[0].id
          // }
          
          contenidoEnJson.push(objeto)
          
          await fs.promises.writeFile('productos.json', JSON.stringify(contenidoEnJson))
      
      }catch(error){
          console.log("No se pudo grabar el archivo")
      }
  
  }

}



//muestra todos los productos
router.get("/productos", validacion, (req, res) => {
  
    const products = new Products (productos)
    res.json(products.getAll())
})


//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
router.get('/productos/:id', validacion, (req, res) => {
    let { id } = req.params;
    const products = new Products(productos)
    id = parseInt(id)

    const encontrar = products.findOne(id)
    if (encontrar){
        res.json(encontrar)
    }else{
    res.json({error: "producto no encontrado"})
    }
  });

  
  router.post('/productos',validacion, (req, res) => {
    const {body} = req;
    const lastId = productos[productos.length - 1];
    
    //agrego bien el body y agrego un id nuevo le agrego fecha
    let nuevoId = lastId.id + 1;
    let insertBody = {id: nuevoId, fecha: fecha.toLocaleDateString(), nombre: body.nombre, descripcion: body.descripcion, codigo:body.codigo, foto: body.foto, precio: body.price, stock: body.stock}
    productos.push(insertBody);
    //grabo el inserbody en productos.json
    fs.promises.writeFile('productos.json', JSON.stringify(productos))
  });



//PUT CON ID PARAMS SIEMPRE y BODY!
router.put('/productos/:id',validacion, (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const productToChange = productos.find((item)=>item.id ==id)
    productToChange.precio = body.precio
    console.log(productToChange)
    res.json({ sucess: "ok", new: productToChange})
  });
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



  ///CARRITO CREAR ARCHIVO 
  async function getData(){
    try{
        return await fs.promises.readFile("carrito.json", "utf-8");
    } catch (error){
        if(error.code == "ENOENT"){
            fs.writeFile("carrito.json","[]", (error)=>{
            if(error){
                console.log("el archivo no pudo ser creado")
            }
        })
       
    }
    
}

}
  //me fijo si ya tengo creado el archivo sino lo creo 
  getData()

  //leo el archivo de carrito 
  const dataCarrito = fs.readFileSync('carrito.json', 'utf8');
    let carrito = JSON.parse(dataCarrito)

    //muestra todos los productos que estan dentro del carrito
router.get("/carrito", (req, res) => {
    const products = new Products (carrito)
    res.json(products.getAll())
})


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
  let insertBody = {id: nuevoId, fecha: fecha.toLocaleDateString(), nombre: body.name, descripcion: body.descripcion, codigo:body.codigo, foto: body.foto, precio: body.price, stock: body.stock}
  carrito.push(insertBody);
});
//tengo que ver como darle que escriba en los archivos y agregue el insertbody


  //DELETE CON ID CARRITO POR PRODUCTO
  router.delete('/carrito/:id/productos/:id_prod', (req, res) => {
    const { id } = req.params;
    const {id_prod} = req.params;

    const productoFilteredById = productos.filter((item)=> item.id != id_prod)
    const carritoFilteredById = productos.filter((item)=> item.id != id)
    //si quiero puedo guardar este en el carrito.json actualizando 
    console.log(carritoFilteredById)
    console.log(productoFilteredById)
    res.json("borrado")
  });