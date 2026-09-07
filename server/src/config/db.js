let lastDbError = null;

const dns = require('dns');
// Only set custom DNS on Windows where Node.js has SRV resolution issues with ISP DNS
if (process.platform === 'win32') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {
    // Ignore if not permitted
  }
}

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo-app';
    lastDbError = null;
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    lastDbError = error.message;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
  }
};

const getLastDbError = () => lastDbError;

module.exports = { connectDB, getLastDbError };
