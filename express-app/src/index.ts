import express, { type Request, type Response } from "express";

interface User {
  id: number;
  name: string;
}

const app = express();
const port = Number(process.env.PORT) || 3000;

let users: User[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "John Smith" },
  { id: 4, name: "Jane Smith" },
];

app.use(express.json());

app.get("/users", (_req: Request, res: Response) => {
  res.json(users);
});

app.get("/users/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

app.post("/users", (req: Request<object, object, { name?: string }>, res: Response) => {
  const name = req.body.name;
  if (typeof name !== "string" || !name.trim()) {
    res.status(400).json({ error: "name is required" });
    return;
  }
  const newUser: User = { id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1, name: name.trim() };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req: Request<{ id: string }, object, { name?: string }>, res: Response) => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  const name = req.body.name;
  if (typeof name !== "string" || !name.trim()) {
    res.status(400).json({ error: "name is required" });
    return;
  }
  user.name = name.trim();
  res.json(user);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const before = users.length;
  users = users.filter((u) => u.id !== id);
  if (users.length === before) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json({ message: "User deleted" });
});

app.get("/", (_req: Request, res: Response) => {
  res.send(`Hello from ${process.env.APP_NAME ?? "Express App"}`);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
