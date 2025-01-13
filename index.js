import cors from "cors";
// import bcrypt from 'bcrypt';

import express from "express";
import {ConnectionDB} from "./DB/connection.js";
import userRouter from "./src/modules/user/user.js";  

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.use("",userRouter);


ConnectionDB();
app.listen(port, () => {
  console.log(`Server is running at : ${port}`);
});



