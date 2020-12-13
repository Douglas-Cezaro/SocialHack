import { Router } from "express";
import userController from "../controller/user.controller";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/", userController.index);
    this.router.get("/:id", userController.show);
    this.router.post("/create", userController.create);
  }
}

export default new Routes().router;
