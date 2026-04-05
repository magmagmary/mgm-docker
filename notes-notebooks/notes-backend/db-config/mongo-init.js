
const DATABASE_NAME = process.env.DATABASE_NAME;
const NOTES_USERNAME = process.env.NOTES_USERNAME;
const NOTES_PASSWORD = process.env.NOTES_PASSWORD;

db = db.getSiblingDB(DATABASE_NAME);

db.createUser({
  user: NOTES_USERNAME,
  pwd: NOTES_PASSWORD,
  roles: [
    { role: 'readWrite', db: DATABASE_NAME },
  ],
});