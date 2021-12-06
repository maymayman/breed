import {NextFunction, Request, Response} from 'express';
import { BreedModel } from 'src/models/breedModel';
import { BreedRepository } from 'src/repositories/breedRepository';

export class BreedController {
  private readonly breedRepository:  BreedRepository
  constructor() {
    this.breedRepository = new BreedRepository();
  }

  public  find = async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<Response<BreedModel[]>> => {
    const results = await this.breedRepository.find({
      orderBy: req.query.order_by as string,
      sort: req.query.sort as string,
    });
    return res.json(results);
  }

  public  retrieve = async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<Response<BreedModel>> => {
    const results = await this.breedRepository.getById(req.params.breed_name);
    return res.json(results);
  }
}