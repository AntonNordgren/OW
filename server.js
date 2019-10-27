const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("src"));

app.listen(PORT, () => {
  console.log("Started listening on ", PORT);
});