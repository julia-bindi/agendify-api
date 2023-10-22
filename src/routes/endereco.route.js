const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");
const { EnderecosController } = require("../controllers");
const cors = require("cors");
const { isAuthorized } = require("../middlewares");


const corsoptions = {
  origin: "*",
  methods: ['GET', 'POST', 'OPTIONS', 'ORDER'],
  allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
  optionsSuccessStatus: 200
}

router.options("/novo", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.post("/novo", cors(corsoptions), EnderecosController.novo)
router.options("/get", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.get("/get", cors(corsoptions), EnderecosController.get)

module.exports.endereco = router;