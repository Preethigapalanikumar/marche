import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/socialmediaadmin";
// const MONGODB_URI = "mongodb+srv://healthcaremarche:eTxXvNRpRsBPQxbr@cluster0.r5yobev.mongodb.net/";

if (!MONGODB_URI) throw new Error("Define MONGODB_URI");

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
