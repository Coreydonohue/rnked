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

    // create users channel
    const userChannel = await prisma.Channel.create({
      data: {
        name: uniqueUsername,
        admin_id: newUser.id,
        private: false,
      },
    });

    // create role for user channel
    const userRole = await prisma.role.create({
      data: {
        user: {
          connect: {
            id: newUser.id,
          },
        },
        channel: {
          connect: {
            id: userChannel.id,
          },
        },
        is_admin: true,
      },
    });

    res.send(newUser, userChannel, userRole);
    console.log("User created:", newUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
