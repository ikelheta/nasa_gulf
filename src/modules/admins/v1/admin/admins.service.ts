import { IAdmin } from "../../../../shared/types/sharedTypes";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";
import { PASSWORD_VALIDATION } from "../../../../shared/constant";
import Admin from "../admins.model";
import { BaseRepository } from "../../../../shared/baseRepository";
import {
  CountOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  UpdateOptions,
} from "sequelize";

 class AdminService {
  adminRepo: BaseRepository<Admin>;
  strongPasswordRegex = PASSWORD_VALIDATION;

  constructor() {
    this.adminRepo = BaseRepository.getInstance(Admin);
  }
  async createOne(body: IAdmin) {
    const admin = await this.adminRepo.create(body);
    return admin;
  }
  async update(data: IAdmin, options: UpdateOptions) {
    const admin = await this.adminRepo.update(data, options);
    return admin;
  }

  async delete(options: DestroyOptions) {
    const admin = await this.adminRepo.delete(options);
    return admin;
  }

  async findById(id: string, options: FindOptions) {
    const admin = await this.adminRepo.findOneById(id, options);
    return admin;
  }
  async findOne(options: FindOptions) {
    const admin = await this.adminRepo.findOne(options);
    return admin;
  }

  async findByIdOrThrowError(id: string, options: FindOptions) {
    const admin = await this.findById(id, options);
    if (!admin) {
      throw new UnprocessableEntityError("Admin not found");
    }
    return admin;
  }
  async findAll(options: FindOptions) {
    const admin = await this.adminRepo.findAll(options);

    return admin;
  }

  async findAllAndCount(options: FindAndCountOptions) {
    const admin = await this.adminRepo.findAndCountAll(options);
    return admin;
  }

  async count(options: CountOptions) {
    const count = await this.adminRepo.count(options);
    return count;
  }
  
}
export default new AdminService()
