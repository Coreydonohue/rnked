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

module.exports = router;
