const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/channels", require("./channels"));
router.use("/posts", require("./posts"));

module.exports = router;
