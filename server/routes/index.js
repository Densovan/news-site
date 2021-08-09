const express = require("express");
const loginWithGoogle = require("./loginWithGoogle");

const router = express.Router();

router.use(loginWithGoogle);

module.exports = router;
