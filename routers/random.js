

const express = require('express')
 const { Router } = express
const randomRouter = Router()

//desactivar
const { fork } = require("child_process");











    //muestra info solicitada
    randomRouter.get("/random", async(req, res) => {
      try {
        res.status(200).render('pages/random')
    } catch (error) {
        res.status(500).send({ error: true })
    }
  })

  

    randomRouter.post("/random", async (req, res) => {
      try{
        const { body } = req;
        const quantity = body.quantity || 100000000
        
        const randomNumbers = fork('./routers/functions/randomnumber.js')

        randomNumbers.send({ message: 'start', quantity: quantity })

        randomNumbers.on('message', (object) =>{
            res.json(object)
        })

    } catch(error){
        res.status(500).send({ error: true })
    }
  }) 




 


module.exports = randomRouter;