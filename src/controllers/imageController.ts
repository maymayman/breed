import {NextFunction, Request, Response} from 'express';
import { BaseError, ErrorCode } from '@utilities/error';
import { ImageModel } from 'src/models/imageModel';
import { ImageRepository } from 'src/repositories/imageRepository';
import * as fs from "fs";
import { BreedRepository } from 'src/repositories/breedRepository';


export class ImageController {
  private readonly imageRepository:  ImageRepository;
  private readonly breedRepository:  BreedRepository;
  constructor() {
    this.imageRepository = new ImageRepository();
    this.breedRepository = new BreedRepository();
  }

  public create = async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<Response<ImageModel>> => {
    const file = req.file;
    const { height = 0, width = 0, breedId } = req.body;
    const breed = await this.breedRepository.getById(breedId)
    if (!breed) throw new BaseError(
      ErrorCode.ENTITY_NOT_FOUND, 
      'Breed Not Found'
    );
    fs.renameSync(file.path, `${file.path}.${file.mimetype.split('/')[1]}`);
    const image = await this.imageRepository.create({
      height,
      width,
      url: `http://localhost:1337/image/${file.path}.${file.mimetype.split('/')[1]}`
    });
    await this.breedRepository.update(
      {reference_image_id: image.id}, 
      { where: { id: breedId }}
    );
    return res.json(image);
  }

  public retrieve = async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<Response<ImageModel>> => {
    const image = await this.imageRepository.getById(req.params.id)
    return res.json(image);
  }

  public delete = async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<Response<ImageModel>> => {
    await this.imageRepository.deleteById(req.params.id)
    return res.json({});
  }

  public random = async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<Response<ImageModel[]>> => {
    const images = await this.imageRepository.random({
      limit: Number(req.query.limit)
    })
    return res.json(images);
  }
}