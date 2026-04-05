
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

db = db.getSiblingDB(DATABASE_NAME);

db.createUser({
  user: DATABASE_USERNAME,
  pwd: DATABASE_PASSWORD,
  roles: [
    { role: 'readWrite', db: DATABASE_NAME },
  ],
});