const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const firebaseProtection = require("../auth/middleware");
const auth = require("../auth/firebase");

// router.get("/all", async (req, res, next) => {
//   try {
//     const allBooks = await prisma.Book.findMany({
//       orderBy: {
//         title: "asc",
//       },
//       include: {
//         Ratings: true || false
//       },
//     });
//     res.send(allBooks);
//   } catch (err) {
//     res
//       .status(500)
//       .send({ message: "Internal server error. Please try again later." });
//     next(err);
//   }
// });


router.post("/new", firebaseProtection, async (req, res, next) => {
    const { title, content, channelId } = req.body;
    console.log('req body from post', req.body)
  
    try {
      const firebaseUid = req.user.uid;
      const user = await prisma.user.findUnique({
        where: {
          firebaseUid: firebaseUid,
        },
      });
  
      const newList = await prisma.list.create({
        data: {
          title: title,
          content: content,
          channel_id: channelId,
          user_id: user.id,
        },
      });
      console.log("new list", newList);
      res.status(200).send(newList);
    } catch (err) {
      res
        .status(500)
        .send({ message: "Internal server error. Please try again later." });
      next(err);
    }
  });




module.exports = router;
