const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const firebaseProtection = require("../auth/middleware");
const auth = require("../auth/firebase");

router.get("/current", firebaseProtection,  async (req, res, next) => {
  try {
    const firebaseUid = req.user.uid;
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

    const userChannel = await prisma.Channel.findFirst({
      where: {
        admin_id: user.id,
      },
    });
    // console.log('channel from get by admin', userChannel)
    res.send(userChannel);
    // console.log('channel from get current', userChannel)
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});

router.get("/admin", firebaseProtection,  async (req, res, next) => {
  try {
    const firebaseUid = req.user.uid;
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    const adminChannels = await prisma.Channel.findMany({
      where: {
        admin_id: +user.id,
      },
    });
    res.send(adminChannels);
    console.log('admin channels', adminChannels)
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});


router.post("/create", firebaseProtection, async (req, res, next) => {
  //   const postId = req.params.id;
    const {name, private} = req.body
    try {
      const firebaseUid = req.user.uid;
      const user = await prisma.user.findUnique({
        where: {
          firebaseUid: firebaseUid,
        },
      });
  
      const channel = await prisma.channel.create({
        data: {
          admin_id: +user.id,
          name: name,
          private: private
        },
      });
      console.log("new channel", channel);
      res.send(channel);
    } catch (err) {
      res
        .status(500)
        .send({ message: "Internal server error. Please try again later." });
      next(err);
    }
  });

module.exports = router;
