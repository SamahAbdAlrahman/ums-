import express from "express";
import initApp from "./src/index.router.js";

const app = express();
const port = 3000;
app.use(express.json());
initApp(app,express);

app.listen(port, () => {
  console.log(`Server is running at : ${port}`);
});



