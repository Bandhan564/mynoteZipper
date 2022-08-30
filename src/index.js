const express = require("express");
const connect = require("./config/db");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const { errorHandler, notFound } = require("./middlewares/errorMiddlewares");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const path = require('path')
app.use(cors());

app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

// -------------deployment-------------

__dirname = path.resolve();
if(process.env.NODE_ENV == 'production'){
app.use(express.static(path.join(__dirname,"frontend/dist")));
app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))
})
}else{
app.get("/", (req, res) => {
  res.send("hello");
});
}

//---------------deployment-------------
app.use(errorHandler);
app.use(notFound);
app.listen(port, async (req, res) => {
  try {
    connect();
    console.log("listening on port no 8080");
  } catch (error) {
    res.send(error.message);
  }
});
