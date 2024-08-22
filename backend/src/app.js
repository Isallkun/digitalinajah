const express = require("express");
const app = express();
const exampleRoute = require("./routes/exampleRoute");

app.use("/api", exampleRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
