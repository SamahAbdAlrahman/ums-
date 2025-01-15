import cors from "cors";
// import bcrypt from 'bcrypt';

import express from "express";
import {ConnectionDB} from "./DB/connection.js";
import userRouter from "./src/modules/user/user.router.js";  
import userAuthRouter from "./src/modules/authentication/authentication.router.js";  


const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.use("/users",userRouter);
app.use("/users/auth",userAuthRouter);



ConnectionDB();
app.listen(port, () => {
  console.log(`Server is running at : ${port}`);
});



