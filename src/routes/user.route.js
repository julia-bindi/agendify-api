const router = require("express").Router();
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const { UserController } = require("../controllers");

const corsoptions = {
  origin: "*",
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
  optionsSuccessStatus: 200
}

router.options("/signup", cors(corsoptions), async (req,res) => { return res.status(StatusCodes.OK) })
router.post("/signup", cors(corsoptions), UserController.signup)
router.options("/login", cors(corsoptions), async (req,res) => { return res.status(StatusCodes.OK) })
router.post("/login", cors(corsoptions), UserController.login)
router.options("/services", cors(corsoptions), async (req,res) => { return res.status(StatusCodes.OK) })
router.get("/services", cors(corsoptions), UserController.myServices)
router.options("/reservations", cors(corsoptions), async (req,res) => { return res.status(StatusCodes.OK) })
router.get("/reservations", cors(corsoptions), UserController.myReservations)
router.options("/company/:email", cors(corsoptions), async (req,res) => { return res.status(StatusCodes.OK) })
router.get("/company/:email", cors(corsoptions), UserController.companyServices)


module.exports.user = router;