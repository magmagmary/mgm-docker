
const DATABASE_NAME = process.env.DATABASE_NAME;
const NOTEBOOKS_USERNAME = process.env.NOTEBOOKS_USERNAME;
const NOTEBOOKS_PASSWORD = process.env.NOTEBOOKS_PASSWORD;

db = db.getSiblingDB(DATABASE_NAME);

db.createUser({
  user: NOTEBOOKS_USERNAME,
  pwd: NOTEBOOKS_PASSWORD,
  roles: [
    { role: 'readWrite', db: DATABASE_NAME },
  ],
});