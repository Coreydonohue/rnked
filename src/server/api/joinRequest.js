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
          status: "pending" 
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
        },
        include: {
            user: true, 
            channel: true, 
          },
      });
      res.send(joinRequests);
    } catch (err) {
      res
        .status(500)
        .send({ message: "Internal server error. Please try again later." });
      next(err);
    }
  });

  module.exports = router;