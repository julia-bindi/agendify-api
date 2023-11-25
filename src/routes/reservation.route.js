const router = require("express").Router();
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const { ReservationController } = require("../controllers");
const { isAuthorized } = require("../middlewares")

const corsoptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
    optionsSuccessStatus: 200
  }

router.options("/create", cors(corsoptions), async (req,res) => { return res.status(StatusCodes.OK) })
router.post("/create", cors(corsoptions), ReservationController.create)
router.options("/check", cors(corsoptions), async (req,res) => { return res.status(StatusCodes.OK) })
router.get("/check", cors(corsoptions), ReservationController.check)
router.options("/cancel", cors(corsoptions), async (req,res) => { return res.status(StatusCodes.OK) })
router.delete("/cancel", cors(corsoptions), ReservationController.cancel)

module.exports.reservation = router