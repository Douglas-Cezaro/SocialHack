import { Router } from "express";
import establishmentController from "../controller/establishment.controller";
import * as multer from "multer";

import uploadConfig from "../config/upload";

class Routes {
  public router: Router;
  public upload = multer(uploadConfig);

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/", establishmentController.index);
    this.router.get("/:id", establishmentController.show);
    this.router.post(
      "/create",
      this.upload.array("images"),
      establishmentController.create
    );
  }
}

export default new Routes().router;
