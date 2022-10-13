const mongoose = require("mongoose");
const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
});

const Usuarios = mongoose.model("usuarios", usuarioSchema);
module.exports = Usuarios;