import express from "express";

const app = express();

const PORT = 3000;

app.listen(() => {
  console.log(`Running on PORT: ${PORT}`);
});
