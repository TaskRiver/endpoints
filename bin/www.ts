import "../src/env";
import app from "../src/app";
import createMongo from "../src/connections/mongodb";

const { PORT, MONGO_URL, MONGO_DB_NAME, MONGO_USER, MONGO_PASSWORD } = process.env as {
  [key: string]: string;
};

(async () => {
  // spin up db
  await createMongo({
    url: MONGO_URL,
    dbName: MONGO_DB_NAME,
    username: MONGO_USER,
    password: MONGO_PASSWORD
  });
  console.info("💽 Successfully connected to database.\n");

  // spin up API
  app.listen(PORT);
  console.info("📡 Successfully started server on port", PORT, ".\n");
})().catch(e => {
  console.error(e);
  process.exit(1);
});
