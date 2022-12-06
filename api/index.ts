import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import consumptions from "./routes/consumptions/consumptions.routes";
import sitesAndUsers from "./routes/sitesAndUsers/sitesAndusers.routes";
import insights from "./routes/insights/insights.routes";
import users from "./routes/users/users.routes";
import sites from "./routes/sites/sites.routes";
import { Router } from 'express';

// config
dotenv.config();
const routes = Router();
const port = process.env.PORT || 8082;
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

routes.use(users);
routes.use(consumptions);
routes.use(insights);
routes.use(sites);
routes.use(sitesAndUsers);

app.use(routes);

// port listen
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});

export default app;
