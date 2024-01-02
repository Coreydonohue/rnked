const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const firebaseProtection = require("../auth/middleware");
const auth = require("../auth/firebase");

router.get("/all", async (req, res, next) => {
  try {
    const allBooks = await prisma.Book.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        Ratings: true || false
      },
    });
    res.send(allBooks);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
    next(err);
  }
});




module.exports = router;
