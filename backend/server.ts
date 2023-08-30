import "dotenv/config";
import express, { Application } from "express";
import router from "./src/routes/router";

const app: Application = express();

app.use(express.json({type:"application/json"}));
app.use(express.urlencoded({extended: false}));
app.use(router);

app.listen(process.env.PORT, () => {
  console.log("Server started listening on port: " + process.env.PORT);
});