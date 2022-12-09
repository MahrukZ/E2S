import express from "express";
import dotenv from "dotenv";
import { UserController } from "./controllers/users.controller";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import jwt from "jsonwebtoken";
import cors from "cors";
import consumptions from "./routes/consumptions/consumptions.routes";
import sitesAndUsers from "./routes/sitesAndUsers/sitesAndusers.routes";
import insights from "./routes/insights/insights.routes";
import users from "./routes/users/users.routes";
import sites from "./routes/sites/sites.routes";
import { Router } from "express";
import { EmailCronJob } from "./emailConfig/emailScheduler";
import cron from "node-cron";
import { sendEmail } from "./emailConfig/sendEmail";

// config
dotenv.config();
const routes = Router();
const port = process.env.PORT || 8082;
const app = express();
const key: string = process.env.JWT_KEY || "key not found";

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: key,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: false,
    },
  })
);

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

const verifyJWT = (req: any, res: any, next: any) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Please provide a token");
  } else {
    jwt.verify(token, key, (err: any, decoded: any) => {
      if (err) {
        res.json("You failed to authenticate");
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

// sign in routes
// in index.tsx as they use app config

// controllers
const userController = new UserController();

// sign in
app.post("/sign-in", async (req, res) => {
  const signedIn: any = await userController.signIn(req, res);
  if (signedIn.length != 0) {
    const user = signedIn[0]["dataValues"];
    const id = user.userId;
    const token = jwt.sign({ id }, key, {
      expiresIn: "1hr",
    });
    res.status(200).json({
      auth: true,
      token: token,
      result: user,
      status: 200,
    });
    req.session.user = user;
    req.session.save();
  } else {
    res.status(200).json({
      auth: false,
    });
  }
});

app.post("/sign-out", async (req, res) => {
  req.session.user = { loggedIn: false };
  req.session.save();
  res.status(200).json({
    message: "Signed Out",
    status: 200,
  });
});

// check sign in status
app.get("/sign-in", async (req, res) => {
  if (req.session.user) {
    if (req.session.user["loggedIn"] == false) {
      res.send({ loggedIn: false });
    } else {
      res.status(200).json({
        loggedIn: true,
        user: req.session.user,
        status: 200,
      });
    }
  } else {
    res.status(200).json({
      loggedIn: false,
      status: 200,
    });
  }
});
app.use(cors());

routes.use(users);
routes.use(consumptions);
routes.use(insights);
routes.use(sites);
routes.use(sitesAndUsers);

app.use(routes);

EmailCronJob();

// port listen
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});

export default app;
