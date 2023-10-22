const router = require("express").Router();
const cors = require("cors");
const { ProdutosController } = require("../controllers");

const corsoptions = {
  origin: "*",
  methods: ['GET'],
  allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
  optionsSuccessStatus: 200
}

router.get("/:tipo", cors(corsoptions), ProdutosController.get);
module.exports.produto = router;