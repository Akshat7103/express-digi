import express from "express";

const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("hello gappu");
// });

// app.get("/raman", (req, res) => {
//   res.send("hello raman bhai");
// });
// app.get("/lappu", (req, res) => {
//   res.send("hello lappu bhai");
// });

app.use(express.json());

let teaData = [];
let nextId = 1;

//add new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(201).send(teaData);
});

// get tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea nor found");
  }
  res.status(200).send(tea);
});

//update tea

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea nor found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//delete tea

app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("tea nor found");
  }
  teaData.splice(index, 1);
  res.status(200).send("delete");
});

app.listen(port, () => {
  console.log(`server is running at port: ${port}...`);
});
