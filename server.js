const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED Exception 💥 Shutting down...");
  process.exit(1);
});

const app = require("./app");

(async () => {
  // SERVER
  const [port, host] = [process.env.PORT || 8080, "127.0.0.1"];
  const server = app.listen(port, host, () => {
    console.log(`Server running on port http://${host}:${port}...`);
  });

  process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("UNHANDLED Rejection 💥 Shutting down...");
    // GRACEFULLY Closing the server!
    server.close(() => {
      process.exit(1);
    });
  });

  const db = await mongoose.connect(process.env.DATABASE_LOCAL);
  console.log("Connected to MongoDB...");
})();

console.log(process.env.NODE_ENV);
