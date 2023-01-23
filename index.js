const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;
const cors = require("cors");
const bodyParser = require("body-parser");

// CORS 세팅
let corsOptions = {
  origin: "*",
  credential: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DB 연결
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1353kim00@",
  database: "hui",
});

// 리스트 불러오기
app.get("/list", (req, res) => {
  const sqlQuery =
    "SELECT BOARD_ID, BOARD_TITLE, REGISTER_ID, DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d') AS REGISTER_DATE FROM BOARD;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

// 글 쓰기
app.post("/insert", (req, res) => {
  var title = req.body.title;
  var content = req.body.content;
  const sqlQuery =
    "INSERT INTO BOARD (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) VALUES (?,?,'artistJay');";
  db.query(sqlQuery, [title, content], (err, result) => {
    res.send(result);
  });
});

//글 수정
app.post("/update", (req, res) => {
  var title = req.body.title;
  var content = req.body.content;

  const sqlQuery =
    "UPDATE BOARD SET BOARD_TITLE = ?, BOARD_CONTENT = ?, UPDATER_ID) FROM (?,?,artistJay);";
  db.query(sqlQuery, [title, content], (err, result) => {
    res.send(result);
  });
});

app.get("/", (req, res) => {
  const sqlQuery = "INSERT INTO requested (rowno) VALUES (1)";
  db.query(sqlQuery, (err, result) => {
    console.log(err);
    res.send("success!");
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
