const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const firebaseProtection = require("../auth/middleware");

router.post("/:id", firebaseProtection, async (req, res, next) => {
//   const postId = req.params.id;
  const {content, postId} = req.body
  try {
    const firebaseUid = req.user.uid;
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    const comment = await prisma.comment.create({
      data: {
        user_id: +user.id,
        post_id: +postId,
        content: content 
      },
    });
    console.log("new comment", comment);
    res.send(comment);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});

router.delete("/delete/:id", firebaseProtection, async (req, res, next) => {
  const likeId = req.params.id;
  try {
    const like = await prisma.Like.delete({
      where: {
        id: +likeId,
      },
    });
    res.send(like);
    console.log("deleted like", like);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
