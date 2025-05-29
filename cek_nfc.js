// server.js
const { NFC } = require("nfc-pcsc");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const nfc = new NFC();

nfc.on("reader", (reader) => {
  console.log(`Reader ditemukan: ${reader.name}`);

  reader.on("card", (card) => {
    console.log("UID:", card.uid);
    io.emit("scan-uid", card.uid);
  });

  reader.on("error", (err) => console.error("Reader error", err));
  reader.on("end", () => console.log(`${reader.name} disconnected`));
});

server.listen(5000, () => {
  console.log("NFC server berjalan di http://localhost:5000");
});
