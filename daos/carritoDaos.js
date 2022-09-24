
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

  async getAll(){
    try{
      const db = admin.firestore()
      const query = db.collection('carritos')
        const doc = query.doc()
        const carritos = await doc.get()
        return carritos.data()
      }catch (error){
        throw Error(error.message)
    }
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



  async deleteProductoDeCarrito(id, idProd, idEncarrito){
    try{
      function random (min, max){
          return Math.floor((Math.random() * (max - min + 1)) + min)
      }
      let productoAtlas = await Productos.getById(idProd)


      const db = admin.firestore()
      const query = db.collection('carritos')
      const doc = query.doc(id)
      
      productoAtlas.id = idEncarrito

      await doc.update({
        productos: admin.firestore.FieldValue.arrayRemove(String(productoAtlas))})

    
 
      }catch (error){
        throw Error(error.message)
    }
    }
  


    async agregarProducto(id, objeto){
      try{
        function random (min, max){
          return Math.floor((Math.random() * (max - min + 1)) + min)
        }
        let productoAtlas = await Productos.getById(objeto.id)
  
  
        const db = admin.firestore()
        const query = db.collection('carritos')
        const doc = query.doc(id)
        
        let idrand = random(1,10000)
        productoAtlas.id = String(idrand)

        await doc.update({
          productos: admin.firestore.FieldValue.arrayRemove(String(productoAtlas))})
  
      
   
        }catch (error){
          throw Error(error.message)
      }
      }



}

module.exports = Carrito



