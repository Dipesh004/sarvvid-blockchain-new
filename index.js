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
  const blockchainString = fs.readFileSync("blockchain1.txt", "utf-8");
  // console.log("the string", blockchainString);
  if (blockchainString) {
    // Parse the array elements as numbers
    const blockchainArray = JSON.parse(blockchainString);
    // Print the array to check if it was read correctly
    // console.log("array", blockchainArray);
    res.json(blockchainArray);
  }
});

app.get("/api/blockchain2", (req, res) => {
  const blockchainString = fs.readFileSync("blockchain2.txt", "utf-8");
  // console.log("the string", blockchainString);
  if (blockchainString) {
    // Parse the array elements as numbers
    const blockchainArray = JSON.parse(blockchainString);
    // Print the array to check if it was read correctly
    // console.log("array", blockchainArray);
    res.json(blockchainArray);
  }
});

app.post("/api/mine1", (req, res) => {
  const blockchainString = fs.readFileSync("blockchain1.txt", "utf-8");
  console.log("the string", blockchainString);
  if (blockchainString) {
    // Parse the array elements as numbers
    const blockchainArray = JSON.parse(blockchainString);
    // Print the array to check if it was read correctly
    console.log("array", blockchainArray);
    blockchain1.replaceChain(blockchainArray);
  }
  const { data } = req.body;

  blockchain1.addBlock({ data });
  const blockchainString1 = JSON.stringify(blockchain1.chain, null, 2);
  fs.writeFileSync("blockchain1.txt", blockchainString1);

  res.redirect("/api/blockchain1");
  // res.send(blockchain1.chain);
});

app.post("/api/mine2", (req, res) => {
  const blockchainString = fs.readFileSync("blockchain2.txt", "utf-8");
  console.log("the string", blockchainString);
  if (blockchainString) {
    // Parse the array elements as numbers
    const blockchainArray = JSON.parse(blockchainString);
    // Print the array to check if it was read correctly
    console.log("array", blockchainArray);
    blockchain2.replaceChain(blockchainArray);
  }
  const { data } = req.body;

  blockchain2.addBlock({ data });
  const blockchainString1 = JSON.stringify(blockchain1.chain, null, 2);
  fs.writeFileSync("blockchain2.txt", blockchainString1);

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

const PORT = 6000;

app.listen(PORT, () => {
  console.log(`listening to PORT:${PORT}`);
});
