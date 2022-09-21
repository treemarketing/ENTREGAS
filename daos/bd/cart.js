//no me tengo que olvidar que si quiero trabajar con archivos 
const fs = require('fs')


//me fijo si ya tengo creado el archivo sino lo creo ACA TENGO QUE CREAR UN ID POR CARRITO
class Cart {
    constructor(carts){
    this.carts = [...carts];
    }

    async  getAll(){
      try{
        const data = await fs.promises.readFile('carrito.json', "utf-8")
        let carritos = JSON.parse(data);
          
        return carritos
        
    } catch (error){
        if(error.code == "ENOENT"){
            fs.writeFile('carrito.json',"[]", (error)=>{
                console.log("el archivo no pudo ser creado")
                return false
            });
            return []
        }
       
    }
}


async save(){
  let arreglo = {};
  try{
      const contenidoEnJson = await this.getAll()
      console.log(contenidoEnJson)
      const indice = contenidoEnJson.map(x=>x.id).sort((a,b) => a - b)
      const lastItem = indice[indice.length - 1] + 1

    
    
      
      if (indice.length == 0){

        arreglo = { id: 1, ...arreglo}
      }else{
        arreglo =  { id: lastItem, ...arreglo }
      }  

       arreglo.timestamp = new Date()
       arreglo.productos = [];


      contenidoEnJson.push(arreglo)

      await fs.promises.writeFile('carrito.json', JSON.stringify(contenidoEnJson))
      return arreglo.id;

  
  }catch(error){
      console.log("No se pudo grabar el archivo")
  }

}
  async delete(id){
  const json = await this.getAll()
  const filterJson = json.filter((e) => e.id != id)

  try{
      if(json.length != filterJson.length){
          await fs.promises.writeFile('carrito.json', JSON.stringify(filterJson))
          return true
      } else{
          return false
      }
  } catch(error){
      return false
  }
}


async getProductsByCart(id){
  const json = await this.getAll()
  const cartFound = json.find((e) => e.id == id)

  if(cartFound){
      if(cartFound.productos){
          return cartFound.productos
      } else{
          return null
      }
  } else{
      return null
  }        
}


async addToCart(id, objeto){
  const json = await this.getAll()
  const cartFound = json.find((e) => e.id == id)

  if(cartFound){
      try{
          cartFound.productos.push(objeto)

          await fs.promises.writeFile('carrito.json', JSON.stringify(json))
          return true
      } catch(error){
          return false
      }
  } else{
      return false
  }
}


async deleteProductOnCart(cartId, productId){
  const json = await this.getAll()
  const cartFound = json.find((e) => e.id == cartId)

  const filterCart = cartFound.productos.filter((p) => p.id != productId)
  cartFound.products = filterCart

  try{
      if(cart.length != filterCart.length){
          await fs.promises.writeFile('carrito.json', JSON.stringify(json))
          return true
      } else{
          return false
      }
  } catch(error){
      return false
  }
}

  }    

  //export default Cart
  module.exports = Cart