const express = require("express");
const app = express();

const port = 3000;


app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


app.get("/api/time", (req, res) => {
  res.json({ 
    time: new Date().toLocaleTimeString() 
  });
});


app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});