

const express = require('express')
 const { Router } = express
const infoRouter = Router()






const version = process.version
console.log(version)






    //muestra info solicitada
    infoRouter.get("/info", (req, res) => {

    
      
    res.json(res)

  }) 




 


module.exports = cartRouter;