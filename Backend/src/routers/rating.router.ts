import { Router } from "express";
import ratingController from "../controller/rating.controller";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/", ratingController.index);
    this.router.get("/:id", ratingController.show);
    this.router.post("/create", ratingController.create);
  }
}

export default new Routes().router;
