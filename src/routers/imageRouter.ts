import { Router } from 'express';
import { ImageController } from 'src/controllers/imageController';
import { errorController } from 'src/utilities/error';
import multer from "multer";

class ImageRouter {
  private router: Router;
  private readonly imageController: ImageController;
  private upload: multer.Multer;
  constructor() {
    this.router = Router();
    this.upload = multer({ dest: 'uploads/' });
    this.imageController = new ImageController();
  }

  public getImageApi(): Router {
    this.router.post(
      '/',
      this.upload.single("image"),
      errorController.handleError(this.imageController.create)
    );
    this.router.get(
      '/random',
      errorController.handleError(this.imageController.random)
    );
    this.router.get(
      '/:id',
      errorController.handleError(this.imageController.retrieve)
    );

    this.router.delete(
      '/:id',
      errorController.handleError(this.imageController.delete)
    );

    return this.router;
  }
};

export const imageRouter = new ImageRouter();