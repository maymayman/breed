import { Router } from 'express';
import { BreedController } from 'src/controllers/breedController';
import { errorController } from 'src/utilities/error';

class BreedRouter {
  private router: Router;
  private readonly breedController: BreedController
  constructor() {
    this.router = Router();
    this.breedController = new BreedController();
  }

  public getBreedApi(): Router {
    this.router.get(
      '/', 
      errorController.handleError(this.breedController.find)
    );

    this.router.get(
      '/:breed_name', 
      errorController.handleError(this.breedController.retrieve)
    );

    return this.router;
  }
};

export const breedRouter = new BreedRouter();