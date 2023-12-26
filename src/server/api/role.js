const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const firebaseProtection = require("../auth/middleware");

router.post("/join", firebaseProtection, async (req, res, next) => {
    const {channelId} = req.body;

  try {
    const firebaseUid = req.user.uid;
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    const role = await prisma.role.create({
      data: {
        user_id: +user.id,
        channel_id: +channelId,
        is_admin: false, 
      },
    });
    console.log("channel joined", role);
    res.send(role);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});



module.exports = router;