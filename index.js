import cors from "cors";
import express from "express";
import {ConnectionDB} from "./DB/connection.js";
import userRouter from "./src/modules/user/user.router.js";  
import userAuthRouter from "./src/modules/auth/auth.router.js";  
import fileUpload from "./src/utils/multer.js";

const app = express();

fileUpload();

app.use(express.json());
app.use(cors());
const port = 3000;

app.use("/users",userRouter);
app.use("/users/auth",userAuthRouter);

ConnectionDB();


app.listen(port, () => {
  console.log(`Server is running at : ${port}`);
});



