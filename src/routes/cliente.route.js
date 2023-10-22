const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");
const cors = require("cors");
const { ClienteController } = require("../controllers");

const corsoptions = {
    origin: "*",
    methods: ['POST','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
    optionsSuccessStatus: 200
  }

router.options("/login", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.post("/login", cors(corsoptions), ClienteController.login)
router.options("/novo", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.post("/novo", cors(corsoptions), ClienteController.novo)

module.exports.cliente = router;