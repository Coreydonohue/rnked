const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const firebaseProtection = require("../auth/middleware");
const {
  createUserWithEmailAndPassword,
  firebaseUserCredential,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const auth = require("../auth/firebase");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // create user in firebase
    const firebaseUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUid = firebaseUser.user.uid;

    // auto generated username logic
    const atSymbolIndex = email.indexOf("@");
    const usernamePrefix =
      atSymbolIndex !== -1 ? email.substring(0, atSymbolIndex) : email;
    const randomNumbers = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    const uniqueUsername = `${usernamePrefix}${randomNumbers}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    // prisma user create
    const newUser = await prisma.User.create({
      data: {
        username: uniqueUsername,
        password: hashedPassword,
        email: email,
        firebaseUid: firebaseUid,
      },
    });

    // create role for user channel
    const userRole = await prisma.role.create({
      data: {
        user_id: +newUser.id,
        channel_id: +userChannel.id,
        is_admin: true,
      },
    });

    res.send(newUser, userRole);
    console.log("User created:", newUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/me", firebaseProtection, async (req, res, next) => {
  try {
    const user = await prisma.User.findUnique({
      where: {
        // firebaseUid: "LGPhOFoy4RWq5BHE51CtBdh2Klk1",
        firebaseUid: req.user.uid,
      },
    });

    if (!user) {
      return res.send(404).send("User not found");
    }
    res.send(user);
    // console.log('current user', user)
  } catch (err) {
    // console.error("Error in findUnique:", err);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userId = +req.params.id;

    const user = await prisma.User.findUnique({
      where: {
        id: userId,
      },
      include: {
        followers: true,
        following: true,
      },
    });

    if (!user) {
      return res.send(404).send("User not found");
    }
    res.send(user);
    // console.log('current user', user)
  } catch (err) {
    console.error("Error in findUnique:", err);
    next(err);
  }
});

module.exports = router;
