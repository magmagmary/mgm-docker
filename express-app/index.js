const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "John Smith" },
  { id: 4, name: "Jane Smith" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  res.json(user);
});

app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  users.push(newUser);
  res.json(newUser);
});

app.put("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  user.name = req.body.name;
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.json({ message: "User deleted" });
});

app.get("/", (req, res) => {
  res.send(`Hello from ${process.env.APP_NAME}`);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
