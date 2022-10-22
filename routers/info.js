

const express = require('express')
 const { Router } = express
const infoRouter = Router()













    //muestra info solicitada
    infoRouter.get("/info", (req, res) => {
      try {
        const yargs = require('yargs/yargs')(process.argv.slice(2))

        const info = {
            arguments: JSON.stringify(yargs),
            os: process.platform,
            version: process.version,
            memory: JSON.stringify(process.memoryUsage().rss, null, 2),
            path: process.execPath,
            processId: process.pid,
            directory: process.cwd()
        }
        res.render('pages/info', { info })
    } catch(error){
        return res.status(400).send({ error: true })
    }

  }) 




 


module.exports = infoRouter;