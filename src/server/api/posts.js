const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const firebaseProtection = require("../auth/middleware");
const auth = require("../auth/firebase");

router.get("/me", async (req, res, next) => {
   //! replace hardcoded
  try {
    const userPosts = await prisma.Post.findMany({
      where: {
        user_id: 8,
      },
      orderBy: {
        createdAt: 'desc',
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
        createdAt: 'desc', // 'desc' for descending order (newest first), 'asc' for ascending order (oldest first)
      },
      include: {
        author: {
          select: {
            username: true,
            // Add other user fields if needed
          },
        },
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

router.post("/", async (req, res, next) => {
  //! replace hardcoded
  const { title, content } = req.body;
  const channelId = 1;
  const userId = 8;

  try {
    const newPost = await prisma.Post.create({
      data: {
        title: title,
        channel_id: channelId,
        user_id: userId,
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
