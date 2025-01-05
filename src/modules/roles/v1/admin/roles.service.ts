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
import Role from "../roles.model";

 class RoleService {
  roleRepo: BaseRepository<Role>;

  constructor() {
    this.roleRepo = BaseRepository.getInstance(Role);
  }
  async createOne(body: IAdmin) {
    const one = await this.roleRepo.create(body);
    return one;
  }
  async update(data: IAdmin, options: UpdateOptions) {
    const one = await this.roleRepo.update(data, options);
    return one;
  }

  async delete(options: DestroyOptions) {
    const one = await this.roleRepo.delete(options);
    return one;
  }

  async findById(id: string, options: FindOptions) {
    const one = await this.roleRepo.findOneById(id, options);
    return one;
  }
  async findOne(options: FindOptions) {
    const one = await this.roleRepo.findOne(options);
    return one;
  }

  async findByIdOrThrowError(id: string, options : FindOptions = {}) {
    const one = await this.findById(id, options);
    if (!one) {
      throw new UnprocessableEntityError("Admin not found");
    }
    return one;
  }
  async findAll(options: FindOptions) {
    const all = await this.roleRepo.findAll(options);

    return all;
  }

  async findAllAndCount(options: FindAndCountOptions) {
    const admin = await this.roleRepo.findAndCountAll(options);
    return admin;
  }

  async count(options: CountOptions) {
    const count = await this.roleRepo.count(options);
    return count;
  }
}
export default new RoleService()
