import { UpdateOptions } from "sequelize/types";
import { BreedModel } from "src/models/breedModel";
import { ImageModel } from "src/models/imageModel";

export class BreedRepository {
  private readonly breedModel: typeof BreedModel;
  constructor() {
    this.breedModel = BreedModel;
  }

  public async getById(id: string): Promise<BreedModel> {
    return this.breedModel.findByPk(id);
  }

  public async find(
    options?: { orderBy: string, sort: string }
  ): Promise<BreedModel[]> {
    const orderBy = options.orderBy || 'id';
    const sort = options.sort === "DESC" ? "DESC" : "ASC";
    return this.breedModel.findAll({
      order: [[orderBy, sort]],
      include: [
        {
          model: ImageModel,
          as: 'image'
        }
      ]
    });
  }

  public async create(data: Partial<BreedModel>): Promise<BreedModel> {
    return this.breedModel.create(data);
  }

  public async update(
    data: Partial<BreedModel>,
    options: UpdateOptions<BreedModel>
  ): Promise<[number, BreedModel[]]> {
    return this.breedModel.update(data, options);
  }
}
