const express = require("express");
const app = express();
const os = require("os");

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello World",
  });
});
app.get("/liveness", (req, res) => {
  return res.status(200).json({
    message: "BOA, TO VIVO!",
    path: process.cwd(),
    // gid: process.getgid(),
    // uid: process.getuid(),
    date : new Date().toLocaleString(),
});
});
app.get("/readiness", (req, res) => {
    return res.status(200).json({
        message: "Bora Bill, to pronto!",
        platform: os.platform(),
        freemem: os.freemem(),
        homedir: os.homedir(),
        date : new Date().toLocaleString(),
    });
});

module.exports = app;
