const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/channels", require("./channels"));
router.use("/posts", require("./posts"));
router.use("/follow", require("./follow"));
router.use("/like", require("./like"));
router.use("/comment", require("./comment"));

module.exports = router;
