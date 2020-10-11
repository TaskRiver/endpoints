import mongoose from "mongoose";

interface MongoEnv {
  url: string;
  dbName: string;
  username: string;
  password: string;
}

export default function createMongo(env: MongoEnv): Promise<typeof mongoose> {
  const { url, dbName, username, password } = env;
  return mongoose.connect(url, {
    dbName,
    user: username,
    pass: password,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
