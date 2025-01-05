import { IAdmin } from "../../../../shared/types/sharedTypes";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";
import { PASSWORD_VALIDATION } from "../../../../shared/constant";
import Department from "../departments.model";
import { BaseRepository } from "../../../../shared/baseRepository";
import {
  CountOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  UpdateOptions,
} from "sequelize";

 class DepartmentService {
  departmentRepo: BaseRepository<Department>;

  constructor() {
    this.departmentRepo = BaseRepository.getInstance(Department);
  }
  async createOne(body: IAdmin) {
    const one = await this.departmentRepo.create(body);
    return one;
  }
  async update(data: IAdmin, options: UpdateOptions) {
    const one = await this.departmentRepo.update(data, options);
    return one;
  }

  async delete(options: DestroyOptions) {
    const one = await this.departmentRepo.delete(options);
    return one;
  }

  async findById(id: string, options: FindOptions) {
    const one = await this.departmentRepo.findOneById(id, options);
    return one;
  }
  async findOne(options: FindOptions) {
    const one = await this.departmentRepo.findOne(options);
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
    const all = await this.departmentRepo.findAll(options);

    return all;
  }

  async findAllAndCount(options: FindAndCountOptions) {
    const admin = await this.departmentRepo.findAndCountAll(options);
    return admin;
  }

  async count(options: CountOptions) {
    const count = await this.departmentRepo.count(options);
    return count;
  }
}
export default new DepartmentService()
