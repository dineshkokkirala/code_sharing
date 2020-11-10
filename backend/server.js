import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"


const app = express();

dotenv.config();

//DB Connection
dbConnection();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello world....!");
});

app.use(express.json());
//routes
app.use("/api/users",userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`server running in ${process.env.PORT}`);
});
