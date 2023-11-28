const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const firebaseProtection = require("../auth/middleware");
const { createUserWithEmailAndPassword, firebaseUserCredential } = require("firebase/auth");
const auth  = require("../auth/firebase");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res, next) => {


  try {
    const { email, password } = req.body;

    const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUid = firebaseUser.user.uid;

    const atSymbolIndex = email.indexOf("@");
    const usernamePrefix =
      atSymbolIndex !== -1 ? email.substring(0, atSymbolIndex) : email;
    const randomNumbers = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
  
    const uniqueUsername = `${usernamePrefix}${randomNumbers}`;

    const hashedPassword = await bcrypt.hash(password, 10);


    const prismaUser = await prisma.User.create({
      data: {
        username: uniqueUsername,
        password: hashedPassword, 
        email: email,
        firebaseUid: firebaseUid,
      },
    });

    res.send(prismaUser)
    console.log("User created:", prismaUser);
    // res
    //   .status(201)
    //   .json({ message: "User registered successfully", user: prismaUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
