import { IEmployee } from "../../../../shared/types/sharedTypes";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";
import { PASSWORD_VALIDATION } from "../../../../shared/constant";
import Admin from "../employees.model";
import { BaseRepository } from "../../../../shared/baseRepository";
import {
  CountOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  UpdateOptions,
} from "sequelize";
import Employee from "../employees.model";

 class EmployeeService {
  employeeRepo: BaseRepository<Employee>;
  strongPasswordRegex = PASSWORD_VALIDATION;

  constructor() {
    this.employeeRepo = BaseRepository.getInstance(Admin);
  }
  async createOne(body: IEmployee) {
    const admin = await this.employeeRepo.create(body);
    return admin;
  }
  async update(data: IEmployee, options: UpdateOptions) {
    const admin = await this.employeeRepo.update(data, options);
    return admin;
  }

  async delete(options: DestroyOptions) {
    const admin = await this.employeeRepo.delete(options);
    return admin;
  }

  async findById(id: string, options: FindOptions) {
    const admin = await this.employeeRepo.findOneById(id, options);
    return admin;
  }
  async findOne(options: FindOptions) {
    const admin = await this.employeeRepo.findOne(options);
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
    const admin = await this.employeeRepo.findAll(options);

    return admin;
  }

  async findAllAndCount(options: FindAndCountOptions) {
    const admin = await this.employeeRepo.findAndCountAll(options);
    return admin;
  }

  async count(options: CountOptions) {
    const count = await this.employeeRepo.count(options);
    return count;
  }
}
export default new EmployeeService()
