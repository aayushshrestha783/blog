const https = require("http");
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db_config");

const PORT = process.env.PORT || 3000;

const server = https.createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connection successful!");

    server.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

startServer();
