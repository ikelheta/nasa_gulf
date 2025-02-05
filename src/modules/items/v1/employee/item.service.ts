import { IAdmin } from "../../../../shared/types/sharedTypes";
import {
  BadRequestError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import { PASSWORD_VALIDATION } from "../../../../shared/constant";
import Item from "../item.model";
import { BaseRepository } from "../../../../shared/baseRepository";
import {
  CountOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  Op,
  UpdateOptions,
} from "sequelize";

class ItemService {
  itemRepo: BaseRepository<Item>;

  constructor() {
    this.itemRepo = BaseRepository.getInstance(Item);
  }
  async createOne(body: IAdmin) {
    const one = await this.itemRepo.create(body);
    return one;
  }
  async update(data: IAdmin, options: UpdateOptions) {
    const one = await this.itemRepo.update(data, options);
    return one;
  }

  async delete(options: DestroyOptions) {
    const one = await this.itemRepo.delete(options);
    return one;
  }

  async findById(id: string, options: FindOptions) {
    const one = await this.itemRepo.findOneById(id, options);
    return one;
  }
  async findOne(options: FindOptions) {
    const one = await this.itemRepo.findOne(options);
    return one;
  }

  async findByIdOrThrowError(id: string, options: FindOptions = {}) {
    const one = await this.findById(id, options);
    if (!one) {
      throw new UnprocessableEntityError("Contractor not found");
    }
    return one;
  }
  async findAll(options: FindOptions) {
    const all = await this.itemRepo.findAll(options);

    return all;
  }

  async findAllAndCount(options: FindAndCountOptions) {
    const admin = await this.itemRepo.findAndCountAll(options);
    return admin;
  }

  async count(options: CountOptions) {
    const count = await this.itemRepo.count(options);
    return count;
  }
  async validateNameNotExistForCreate(name : string) {
    const exist = await this.itemRepo.findOne({
      where: {
        name,
      },
    });
    if (exist) {
      throw new BadRequestError("This name already exist");
    }
  }
  async validateNameNotExistForUpdate(id:string , name : string) {
    const exist = await this.itemRepo.findOne({
      where: {
        name,
        id :{[Op.ne]: id}
      },
    });
    if (exist) {
      throw new BadRequestError("This name already exist");
    }
  }



}
export default new ItemService();
