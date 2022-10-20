

require('dotenv').config()

const MONGOURL= process.env.MONGOURL

// module.exports = {
//     //HOST: process.env.HOST || "127.0.0.1",
//     MONGO_URL: process.env.MONGOURL
//     //PORT: process.env.PORT || 3000,
//   };
  



   const yargs = require('yargs/yargs')(process.argv.slice(2))
   const args = yargs
     .default({
     PORT: 8080, 
   })

  .argv
  

 console.log(yargs)


  const PORT = args.PORT


  module.exports = { PORT, MONGOURL }