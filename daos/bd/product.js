//para leer archivos
const fs = require('fs')



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
          const indice = contenidoEnJson.map(x=>x.id).sort((a,b) => a - b)
          const lastItem = indice[indice.length - 1] + 1
          // let contenidoEnJson = JSON.parse(productos);

          //si ya creo la variable no tengo que volver a agregar
           let arreglo = [];
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
          
            //hago que vuelva a grabar todo pero con los cambios introducitos en la constante
            await fs.promises.writeFile('productos.json', JSON.stringify(json))                
            return producToChange
        } catch(error){
            return false
        }
    } else{
        return false
    }
}

  async delete(id){
    const json = await this.getAll()
    const filterJson = json.filter((e) => e.id != id)

    try{
        if(json.length != filterJson.length){
            await fs.promises.writeFile('productos.json', JSON.stringify(filterJson))
            return true
        } else{
            return false
        }
    } catch(error){
        return false
    }
  }
}
















module.exports = Products