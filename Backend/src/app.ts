import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as path from "path";
import "express-async-errors";
import errorHandler from "./errors/handler";
import UserRouter from "./routers/user.router";
import EstablishmentRouter from "./routers/establishment.router";
import RatingRouter from "./routers/rating.router";
import TypeRouter from "./routers/type.router";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.express.use(errorHandler);
    this.express.use(
      "/uploads",
      express.static(path.join(__dirname, "..", "uploads"))
    );
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(cors());
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use("/user", UserRouter);
    this.express.use("/establishment", EstablishmentRouter);
    this.express.use("/rating", RatingRouter);
    this.express.use("/type", TypeRouter);
  }
}

export default new App().express;
