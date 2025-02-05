import { IAdmin } from "../../../../shared/types/sharedTypes";
import {
  AppError,
  BadRequestError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import { PASSWORD_VALIDATION } from "../../../../shared/constant";
import Item from "../projectMaterialRequest.model";
import { BaseRepository } from "../../../../shared/baseRepository";
import {
  CountOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  Op,
  UpdateOptions,
} from "sequelize";
import ProjectMaterialRequest from "../projectMaterialRequest.model";
import MaterialRequestItems from "../../../../shared/junctionTables/materialRequestItems.model";
import sequelize from "../../../../config/db/config";

class ProjectMaterialRequestService {
  requestRepo: BaseRepository<ProjectMaterialRequest>;
  requestItemsRepo: BaseRepository<MaterialRequestItems>;

  constructor() {
    this.requestRepo = BaseRepository.getInstance(ProjectMaterialRequest);
    this.requestItemsRepo = BaseRepository.getInstance(MaterialRequestItems);
  }
  async createOne(body: any, items: any[]) {
    const transaction = await sequelize.transaction();

    try {
      const one = await this.requestRepo.create(body, { transaction });
      const bulk = items.map((ele) => ({
        itemId: ele.id,
        requestId: one.id,
        wantedQuantity: ele.quantity,
      }));
      await this.requestItemsRepo.bulkCreate(bulk, { transaction });
      await transaction.commit();
      return one;
    } catch (error) {
      await transaction.rollback();
      throw new AppError(error);
    }
  }
  async update(data: IAdmin, options: UpdateOptions) {
    const one = await this.requestRepo.update(data, options);
    return one;
  }

  async delete(options: DestroyOptions) {
    const one = await this.requestRepo.delete(options);
    return one;
  }

  async findById(id: string, options: FindOptions) {
    const one = await this.requestRepo.findOneById(id, options);
    return one;
  }
  async findOne(options: FindOptions) {
    const one = await this.requestRepo.findOne(options);
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
    const all = await this.requestRepo.findAll(options);

    return all;
  }

  async findAllAndCount(options: FindAndCountOptions) {
    const admin = await this.requestRepo.findAndCountAll(options);
    return admin;
  }

  async count(options: CountOptions) {
    const count = await this.requestRepo.count(options);
    return count;
  }
  async validateNameNotExistForCreate(name: string) {
    const exist = await this.requestRepo.findOne({
      where: {
        name,
      },
    });
    if (exist) {
      throw new BadRequestError("This name already exist");
    }
  }
  async validateNameNotExistForUpdate(id: string, name: string) {
    const exist = await this.requestRepo.findOne({
      where: {
        name,
        id: { [Op.ne]: id },
      },
    });
    if (exist) {
      throw new BadRequestError("This name already exist");
    }
  }
}
export default new ProjectMaterialRequestService();
