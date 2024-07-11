const express = require('express');
const app = express();
const port = 9992;
const mongoose = require('mongoose');
var routes=require("./route/routes");
mongoose.set("strictQuery",false);
const cors=require('cors')

app.use(cors({
  origin:"http://localhost:4200"
}))


mongoose.connect("mongodb://mongo:27017/DAT", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(port, () => {
      console.log(`DB connected started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Couldn't connect to MongoDB:", err);
  });
  

  app.use(express.json());
  app.use(routes)