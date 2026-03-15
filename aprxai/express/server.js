const express = require("express");
const app = express();

const port = 3000;

// Root route
app.get("/", (req, res) => {
  res.send("Server is working");
});

// About route
app.get("/about", (req, res) => {
  res.send("This is About Page");
});

// Test route with parameter
app.get("/user/:name", (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});