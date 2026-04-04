const DATABASE_NAME = process.env.DATABASE_NAME;
const MONGO_ROOT_USERNAME = process.env.MONGO_ROOT_USERNAME;
const MONGO_ROOT_PASSWORD = process.env.MONGO_ROOT_PASSWORD;

db  = db.getSiblingDB(DATABASE_NAME);

db.createUser({
  user: MONGO_ROOT_USERNAME,
  pwd: MONGO_ROOT_PASSWORD,
  roles: [
    { role: "readWrite", db: DATABASE_NAME },
  ],
});