const express = require("express")
const bodyParser = require("body-parser");
const token = require("./../middle/token")
const router = express.Router();
router.use(bodyParser.json()) // middleware

router.get("/newToken")