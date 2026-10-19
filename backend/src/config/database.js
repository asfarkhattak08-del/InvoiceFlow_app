import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/invoice_vault';
  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.name}`);
}

export function databaseHealth() {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  return states[mongoose.connection.readyState] || 'unknown';
}

