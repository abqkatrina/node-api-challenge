const express = require('express');
const helmet = require("helmet");
const projectRouter = require("../projects/projectRouter.js");
const actionRouter = require("../actions/actionRouter.js");
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

server.use( helmet(), logger);
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);


server.get("/", (req, res) => {
  res.send("server is running")
})

function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;
  const timestamp = new Date().toISOString();

  console.log(`${method} to ${endpoint} at ${timestamp}`);

  next();
};


module.exports = server;
