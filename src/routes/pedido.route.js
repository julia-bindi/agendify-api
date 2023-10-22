const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");
const cors = require("cors");
const { PedidosController } = require("../controllers");
const { isAuthorized } = require("../middlewares");


const corsoptions = {
  origin: "*",
  methods: ['POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
  optionsSuccessStatus: 200
}

router.options("/novo", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.post("/novo", cors(corsoptions), PedidosController.novo)
router.delete("/cancelar/:id", cors(corsoptions), PedidosController.deletar)

module.exports.pedido = router;