const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const firebaseProtection = require("../auth/middleware");

router.post("/follow/:id", firebaseProtection, async (req, res, next) => {
  const followedUser = req.params.id;
  console.log("params from follow post", req.params);

  try {
    const firebaseUid = req.user.uid;
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    const follow = await prisma.Follow.create({
      data: {
        follower_id: user.id,
        followee_id: +followedUser,
      },
    });
    console.log("new follower", follow);
    res.send(follow);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});

router.delete("/unfollow/:id", firebaseProtection, async (req, res, next) => {
//   const followedUser = req.params.id;
  try {
    const firebaseUid = req.user.uid;
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    const follow = await prisma.Follow.delete({
      where: {
        id: +req.params.id
      },
    });
    res.send(follow);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
