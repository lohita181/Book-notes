import express from 'express';
import pg from 'pg';
const app = express();

const port = 3000;

app.use(express.static('public'))

app.get("/", (req, res) => {
  res.render("home.ejs");
})

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});