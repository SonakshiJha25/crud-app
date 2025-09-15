const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public")); 

let items = [];
let id = 1;

// Create
app.post("/items", (req, res) => {
  const item = { id: id++, name: req.body.name };
  items.push(item);
  res.json(item);
});

// Read all
app.get("/items", (req, res) => {
  res.json(items);
});

// Update
app.put("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(i => i.id === itemId);
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Delete
app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(i => i.id !== itemId);
  res.json({ message: "Item deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
