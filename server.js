const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sinikukiss",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/orders", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "orders.html"));
});

// Create Data
app.post("/create", (req, res) => {
  const { nama, nohp, tanggal, alamat, jeniscookies, qty } = req.body;
  const sql = `INSERT INTO orders (nama, nohp, tanggal, alamat, jeniscookies, qty) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [nama, nohp, tanggal, alamat, jeniscookies, qty],
    (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      return res
        .status(200)
        .json({ message: "Terima kasih sudah membeli!", success: true });
    }
  );
});

// Run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
