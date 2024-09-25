const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require("./config/database");

dotenv.config({ path: 'backend/config/config.env' });

const PORT = process.env.PORT || 4000; // Use the environment variable PORT or fallback to 4000

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to Handling Uncaught Exception`);
  process.exit(1);
});

// Connecting to database
connectDatabase();

// Starting the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});

