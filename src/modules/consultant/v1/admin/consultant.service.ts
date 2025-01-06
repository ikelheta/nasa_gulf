import { IAdmin } from "../../../../shared/types/sharedTypes";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";
import { PASSWORD_VALIDATION } from "../../../../shared/constant";
import { BaseRepository } from "../../../../shared/baseRepository";
import {
  CountOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  UpdateOptions,
} from "sequelize";
import Consultant from "../consultant.model";

 class ConsultantService {
  consultantRepo: BaseRepository<Consultant>;
  strongPasswordRegex = PASSWORD_VALIDATION;

  constructor() {
    this.consultantRepo = BaseRepository.getInstance(Consultant);
  }
  async createOne(body: IAdmin) {
    const admin = await this.consultantRepo.create(body);
    return admin;
  }
  async update(data: IAdmin, options: UpdateOptions) {
    const admin = await this.consultantRepo.update(data, options);
    return admin;
  }

  async delete(options: DestroyOptions) {
    const admin = await this.consultantRepo.delete(options);
    return admin;
  }

  async findById(id: string, options: FindOptions) {
    const admin = await this.consultantRepo.findOneById(id, options);
    return admin;
  }
  async findOne(options: FindOptions) {
    const admin = await this.consultantRepo.findOne(options);
    return admin;
  }

  async findByIdOrThrowError(id: string, options: FindOptions) {
    const admin = await this.findById(id, options);
    if (!admin) {
      throw new UnprocessableEntityError("Consultant not found");
    }
    return admin;
  }
  async findAll(options: FindOptions) {
    const admin = await this.consultantRepo.findAll(options);

    return admin;
  }

  async findAllAndCount(options: FindAndCountOptions) {
    const admin = await this.consultantRepo.findAndCountAll(options);
    return admin;
  }

  async count(options: CountOptions) {
    const count = await this.consultantRepo.count(options);
    return count;
  }
  
}
export default new ConsultantService()
