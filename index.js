import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/index.js";

/*import UserUMKM from "./models/umkmModels.js";*/
/*import UserFarm from "./models/farmModels.js";*/
/*import Chicken from "./models/chickenModels.js";*/

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected');
    //Query for create table in database
    /*await UserUMKM.sync();*/
    /*await UserFarm.sync();*/
    /*await Chicken.sync();*/
} catch (error) {
    console.error(error);
}

//middleware
app.use(cookieParser());
app.use(cors( {Credential: true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
