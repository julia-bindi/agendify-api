const router = require("express").Router();
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const { ServiceController } = require("../controllers");
const { isAuthorized } = require("../middlewares")

const corsoptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
    optionsSuccessStatus: 200
  }

router.options("/create", cors(corsoptions), async (req,res) => { return res.status(StatusCodes.OK) })
router.post("/create", cors(corsoptions), ServiceController.create)
router.options("/delete", cors(corsoptions), async (req,res) => { return res.status(StatusCodes.OK) })
router.delete("/delete", cors(corsoptions), ServiceController.destroy)
router.options("/search", cors(corsoptions), async (req,res) => { return res.status(StatusCodes.OK) })
router.post("/search", cors(corsoptions), ServiceController.search)

module.exports.service = router