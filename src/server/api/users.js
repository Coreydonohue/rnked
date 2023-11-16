const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const protection = require("../middleware");
const bcrypt = require("bcrypt");
router.use(protection);

router.get("/:id", protection, async (req, res, next) => {
  try {
    // if (!req.User) {
    //   return res.status(401).send("User not authenticated");
    // }
    const user = await prisma.User.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!user) {
      return res.send(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
