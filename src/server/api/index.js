const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/channels", require("./channels"));
router.use("/posts", require("./posts"));
router.use("/follow", require("./follow"));
router.use("/like", require("./like"));
router.use("/comment", require("./comment"));
router.use("/role", require("./role"));
router.use("/joinRequest", require("./joinRequest"));
router.use("/books", require("./books"));

module.exports = router;
