import { Router } from "express";
import typeController from "../controller/type.controller";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/", typeController.index);
    this.router.get("/:id", typeController.showType);
    this.router.get("/establishment/:id", typeController.show);
    this.router.post("/create", typeController.create);
  }
}

export default new Routes().router;
