const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
// const socket = require("socket.io");

app.use(cors())

app.use(express.json({limit: "200mb"}));
app.use(express.urlencoded({limit: "200mb", extended: true, parameterLimit:50000}));
app.use(express.text({limit:'200mb'}));

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api", require("./api"));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });

// const io = socket(server, {
//     allowEIO3: true,
//     cors: {credentials: true, origin: 'http://localhost:3000'},
// });