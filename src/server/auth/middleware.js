const admin = require("../auth/admin");

const firebaseProtection = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).send("No token provided.");
  }

  const token = authorizationHeader.substring('Bearer '.length);

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // console.log("Decoded Token:", decodedToken);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error.stack);
    return res.status(403).send("Failed to authenticate token.");
  }
};

module.exports = firebaseProtection;
