const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(morgan("common"));
app.use(cors());
const books = require("./books-data.js");

app.get("/books", (req, res) => {
  // if nothing is entered
  const { search = "", sort } = req.query;

  if (sort) {
    if (!["title", "rank"].includes(sort)) {
      return res.status(400).send("Sort must be one of title or rank");
    }
  }
  // books comes from require above.
  let results = books.filter(
    book => book.title.toLowerCase().includes(search.toLowerCase()) // queries can have space between words
  );
  // after books are filtered by search we an then sort
  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  // see if it works first by returning all books
  res.json(results);
});

app.listen(8000, () => {
  console.log("server started on PORT 8000");
});
