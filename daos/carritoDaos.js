
let admin = require("firebase-admin");

let serviceAccount = require("./ecommerce-b13b6-firebase-adminsdk-z5wy7-75e5ba3f58.json");
const Producto = require("./productoDaos")

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });



const Productos = new Producto()

class Carrito {
  constructor(){
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://ecommerce-b13b6-default-rtdb.firebaseio.com/'
    })
  }



  async newCarrito() {
    const db = admin.firestore()
    const query = db.collection('carritos')
    let time = new Date();
    try{
      const doc = query.doc()
      const carrito = await doc.create({
            timestamp: time.toString(),
            productos: []
      })
      return carrito
    }catch (error){
      throw Error(error.message)
  }
  }


  async getCarritoById(idC){
    try{
      const db = admin.firestore()
      const query = db.collection('carritos')
        const doc = query.doc(String(idC))
        const carritoEncontrado = await doc.get()
        return carritoEncontrado.data()
      }catch (error){
        throw Error(error.message)
    }
    }


  async deleteCarritoById(idC){
    try{
      const db = admin.firestore()
      const query = db.collection('carritos')
        const doc = query.doc(String(idC))
        await doc.delete()
      }catch (error){
        throw Error(error.message)
    }
    }



  async deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito){
    try{
      function random (min, max){
        return Math.floor((Math.random() * (max - min + 1)) + min)
      }
      let productoAtlas = await Productos.getById(idProducto)


      const db = admin.firestore()
      const query = db.collection('carritos')
      const doc = query.doc(idCarrito)
      
      productoAtlas.idC = idEnCarrito

      await doc.update({
        productos: admin.firestore.FieldValue.arrayRemove(String(productoAtlas))})

    
 
      }catch (error){
        throw Error(error.message)
    }
    }
  


    async agregarProducto(idCarrito, idProducto){
      try{
        function random (min, max){
          return Math.floor((Math.random() * (max - min + 1)) + min)
        }
        let productoAtlas = await Productos.getById(idProducto)
  
  
        const db = admin.firestore()
        const query = db.collection('carritos')
        const doc = query.doc(idCarrito)
        
        let idrand = random(1,10000)
        productoAtlas.idC = String(idrand)

        await doc.update({
          productos: admin.firestore.FieldValue.arrayRemove(String(productoAtlas))})
  
      
   
        }catch (error){
          throw Error(error.message)
      }
      }



}

module.exports = Carrito





//esta es la clase anterior
// class Cart {
//   constructor(carts){
//   this.carts = [...carts];
//   }

//   async  getAll(){
//     try{
//       const data = await fs.promises.readFile('carrito.json', "utf-8")
//       let carritos = JSON.parse(data);
        
//       return carritos
      
//   } catch (error){
//       if(error.code == "ENOENT"){
//           fs.writeFile('carrito.json',"[]", (error)=>{
//               console.log("el archivo no pudo ser creado")
//               return false
//           });
//           return []
//       }
     
//   }
// }


// async save(){
// let arreglo = {};
// try{
//     const contenidoEnJson = await this.getAll()
//     console.log(contenidoEnJson)
//     const indice = contenidoEnJson.map(x=>x.id).sort((a,b) => a - b)
//     const lastItem = indice[indice.length - 1] + 1

  
  
    
//     if (indice.length == 0){

//       arreglo = { id: 1, ...arreglo}
//     }else{
//       arreglo =  { id: lastItem, ...arreglo }
//     }  

//      arreglo.timestamp = new Date()
//      arreglo.productos = [];


//     contenidoEnJson.push(arreglo)

//     await fs.promises.writeFile('carrito.json', JSON.stringify(contenidoEnJson))
//     return arreglo.id;


// }catch(error){
//     console.log("No se pudo grabar el archivo")
// }

// }
// async delete(id){
// const json = await this.getAll()
// const filterJson = json.filter((e) => e.id != id)

// try{
//     if(json.length != filterJson.length){
//         await fs.promises.writeFile('carrito.json', JSON.stringify(filterJson))
//         return true
//     } else{
//         return false
//     }
// } catch(error){
//     return false
// }
// }


// async getProductsByCart(id){
// const json = await this.getAll()
// const cartFound = json.find((e) => e.id == id)

// if(cartFound){
//     if(cartFound.productos){
//         return cartFound.productos
//     } else{
//         return null
//     }
// } else{
//     return null
// }        
// }


// async addToCart(id, objeto){
// const json = await this.getAll()
// const cartFound = json.find((e) => e.id == id)

// if(cartFound){
//     try{
//         cartFound.productos.push(objeto)

//         await fs.promises.writeFile('carrito.json', JSON.stringify(json))
//         return true
//     } catch(error){
//         return false
//     }
// } else{
//     return false
// }
// }


// async deleteProductOnCart(cartId, productId){
// const json = await this.getAll()
// const cartFound = json.find((e) => e.id == cartId)

// const filterCart = cartFound.productos.filter((p) => p.id != productId)
// cartFound.products = filterCart

// try{
//     if(cart.length != filterCart.length){
//         await fs.promises.writeFile('carrito.json', JSON.stringify(json))
//         return true
//     } else{
//         return false
//     }
// } catch(error){
//     return false
// }
// }

// }    

// //export default Cart
// module.exports = Cart