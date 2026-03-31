import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import route from "./routes/userRoute.js"
import cors from "cors"

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Routes (move this UP)
app.use("/api", route);

// Config
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

// DB + Server
mongoose.connect(MONGO_URL).then(() => {
    console.log("Db connected successfully");

    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });

}).catch((err) => {
    console.log(err);
});