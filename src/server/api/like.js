const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const firebaseProtection = require("../auth/middleware");
const auth = require("../auth/firebase");

router.post("/", firebaseProtection, async (req, res, next) => {
    const post = req.params.id;

  try {
    const firebaseUid = req.user.uid;
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    // const userChannel = await prisma.Channel.findFirst({
    //   where: {
    //     admin_id: user.id,
    //   },
    // });

    const newLike = await prisma.Like.create({
      data: {
        user_id: +user.id,
        post_id: +post,
      },
    });
    console.log("new like", newLike);
    res.send(newLike);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});

module.exports = router;
