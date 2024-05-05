const http = require("http");

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const startServer = () => {
  console.log("Starting server...");
  server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
};
startServer();
