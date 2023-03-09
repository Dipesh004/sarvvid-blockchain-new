let fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const sizeof = require("object-sizeof");

const Blockchain = require("./blockchain/blockchain");
const { json } = require("body-parser");

const app = express();
app.use(cors());

const blockchain1 = new Blockchain();
const blockchain2 = new Blockchain();

app.use(bodyParser.json());
app.get("/api/blockchain1", (req, res) => {
  fs.readFile("blockchain1.txt", function (err, data) {
    if (err) {
      console.log("error", err);
    }
    // console.log("data is ", data.toString());
    // console.log("typeof", typeof data);

    res.json(JSON.parse(data));
  });
});
app.get("/api/blockchain2", (req, res) => {
  // res.json(blockchain2.chain);
  fs.readFile("blockchain2.txt", function (err, data) {
    if (err) {
      console.log("error", err);
    }
    // console.log("data is ", data.toString());
    // console.log("typeof", typeof data);

    res.json(JSON.parse(data));
  });
});

app.post("/api/mine1", (req, res) => {
  const { data } = req.body;

  blockchain1.addBlock({ data });

  const bcString = JSON.stringify(blockchain1.chain);
  fs.writeFile("blockchain1.txt", bcString, function (err) {
    if (err) {
      console.log("error", err);
    }
    console.log("success file is written");
  });
  res.redirect("/api/blockchain1");
});
app.post("/api/mine2", (req, res) => {
  const { data } = req.body;

  blockchain2.addBlock({ data });
  const bcString = JSON.stringify(blockchain2.chain);
  fs.writeFile("blockchain2.txt", bcString, function (err) {
    if (err) {
      console.log("error", err);
    }
    console.log("success file is written");
  });

  res.redirect("/api/blockchain2");
});

app.post("/api/mine20000", (req, res) => {
  const { data } = req.body;
  const initialTimestamp = new Date().toLocaleString();
  let totalSize = 0;
  for (let i = 0; i < 200; i++) {
    (data.name = `testname${i}`), (data.mobile = `testmobile${i}`);
    console.log("data", data);
    console.log("data", data.difficulty);
    // const sizeObj = sizeof(data);
    blockchain1.addBlock({ data });
    // totalSize += sizeObj;
    // console.log("Total size", totalSize);
  }
  const finalTimeStamp = new Date().toLocaleString();
  console.log("initialTimestamp", initialTimestamp);
  console.log("finalTimeStamp", finalTimeStamp);
  res.redirect("/api/blocks");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listening to PORT:${PORT}`);
});
