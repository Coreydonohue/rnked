const { verifyIdToken } = require("firebase/auth");
const { auth } = require("../auth/firebase");

const firebaseProtection = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("No token provided.");
  }

  try {
    const decodedToken = await verifyIdToken(auth, token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(403).send("Failed to authenticate token.");
  }
};

module.exports = firebaseProtection;
