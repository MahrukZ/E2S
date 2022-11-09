import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getUsers } from "./database/db";

dotenv.config();

const port = process.env.PORT || 8082;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", async (req, res) => {
    try {
        const u = await getUsers();
        console.log(u);
        res.json(u);
    } catch (error) {
        console.error(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});