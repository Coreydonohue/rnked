const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const firebaseProtection = require("../auth/middleware");

router.post("/request/:id", firebaseProtection, async (req, res, next) => {
  const channelId = req.params.id;
  // const { name, private } = req.body;
  try {
    const firebaseUid = req.user.uid;
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    const request = await prisma.joinRequest.create({
      data: {
        user_id: +user.id,
        channel_id: +channelId,
        status: "pending",
      },
    });

    console.log("new request", request);
    res.send(request);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});

router.get("/channel/:id", async (req, res, next) => {
  const channelId = req.params.id;
  try {
    const joinRequests = await prisma.joinRequest.findMany({
      where: {
        channel_id: +channelId,
        status: "pending",
      },
      include: {
        user: true,
        channel: true,
      },
    });
    res.send(joinRequests);
    // console.log("join requests ", joinRequests);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});

router.post("/accept", firebaseProtection, async (req, res, next) => {
  const { channelId, userId, requestId } = req.body;

  try {
    const role = await prisma.role.create({
      data: {
        user_id: +userId,
        channel_id: +channelId,
        is_admin: false,
      },
    });

    const joinRequest = await prisma.joinRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status: "accepted",
      },
    });

    console.log("request accepted", role, joinRequest);
    res.status(200).send({ role, joinRequest });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});

module.exports = router;
