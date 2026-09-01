
const express = require('express');
const dns = require("dns");
const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const authRouter = require('./routes/authRoutes');
const app = express();

require('dotenv').config();

app.use(express.json());

app.use(courseRoutes)

dns.setServers(["1.1.1.1","8.8.8.8"])


app.use("/api/user", authRouter)
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// Start the Express Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
