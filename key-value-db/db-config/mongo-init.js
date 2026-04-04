const DATABASE_NAME = process.env.DATABASE_NAME;
const MONGO_USERNAME = process.env.MONGO_KEY_VALUE_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_KEY_VALUE_PASSWORD;

db  = db.getSiblingDB(DATABASE_NAME);

db.createUser({
  user: MONGO_USERNAME,
  pwd: MONGO_PASSWORD,
  roles: [
    { role: "readWrite", db: DATABASE_NAME },
  ],
});