const dns = require('dns');
// Set public DNS to reliably resolve MongoDB SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore in environments where setting DNS servers is restricted
}

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo-app';
    const conn = await mongoose.connect(connUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('💡 Tip: Agar aap local MongoDB run nahi kar rahe to MongoDB Atlas me Database User aur IP whitelist (0.0.0.0/0) check karein.');
  }
};

module.exports = connectDB;
