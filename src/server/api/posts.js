const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const firebaseProtection = require("../auth/middleware");
const auth = require("../auth/firebase");

router.get("/me", firebaseProtection, async (req, res, next) => {
  try {
    const firebaseUid = req.user.uid;
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    const userPosts = await prisma.Post.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    // console.log('user posts from get route', userPosts)
    res.send(userPosts);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});



router.get("/all", async (req, res, next) => {
  try {
    const allPosts = await prisma.Post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        Likes: true || false
      },
    });
    res.send(allPosts);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});

router.get("/:id", firebaseProtection, async (req, res, next) => {
  try {
    const userId = +req.params.id
    const userPosts = await prisma.Post.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        Likes: true || false
      },
    });
    // console.log('user posts from get route', userPosts)
    res.send(userPosts);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});

router.post("/", firebaseProtection, async (req, res, next) => {
  const { title, content } = req.body;

  try {
    const firebaseUid = req.user.uid;
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    const userChannel = await prisma.Channel.findFirst({
      where: {
        admin_id: user.id,
      },
    });

    const newPost = await prisma.Post.create({
      data: {
        title: title,
        channel_id: userChannel.id,
        user_id: user.id,
      },
    });
    console.log("new post", newPost);
    res.send(newPost);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});

module.exports = router;
