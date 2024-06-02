const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
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

app.get("/", () => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Create Data
app.post("/create", (req, res) => {
  const { nama, nohp, tanggal, alamat, jeniscookies, qty } = req.body;
  const sql = `INSERT INTO orders (nama, nohp, tanggal, alamat, jeniscookies, qty) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [nama, nohp, tanggal, alamat, jeniscookies, qty],
    (err, result) => {
      if (err) throw err;
      res.send("Terima kasih sudah order!");
    }
  );
});

// Read Data
app.post("/orders", (req, res) => {
  const sql = `SELECT * FROM orders`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Read single Data
app.post("/order", (req, res) => {
  const { id } = req.body;
  const sql = `SELECT * FROM orders WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Update Data
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { nama, nohp, tanggal, alamat, jeniscookies, qty } = req.body;
  const sql = `UPDATE orders SET nama = ?, nohp = ?, tanggal = ?, alamat = ?, jeniscookies = ?, qty = ? WHERE id = ?`;
  db.query(
    sql,
    [nama, nohp, tanggal, alamat, jeniscookies, qty, id],
    (err, result) => {
      if (err) throw err;
      res.send("Data updated!");
    }
  );
});

// Delete Data
app.delete("/delete/:id", (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM orders WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send("Data deleted!");
  });
});

// Run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
