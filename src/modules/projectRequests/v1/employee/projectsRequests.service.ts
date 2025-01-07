import { IAdmin } from "../../../../shared/types/sharedTypes";
import {
  AppError,
  BadRequestError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";

import { BaseRepository } from "../../../../shared/baseRepository";
import {
  CountOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  Op,
  UpdateOptions,
} from "sequelize";

import ProjectRequest from "../projectsRequest.model";

class ProjectService {
  projectRepo: BaseRepository<ProjectRequest>;

  constructor() {
    this.projectRepo = BaseRepository.getInstance(ProjectRequest);
  }
  async createOne(body: any) {
    return this.projectRepo.create(body)
  }
  async update(data: any, options: UpdateOptions) {
    const one = await this.projectRepo.update(data, options);
    return one;
  }

  async delete(options: DestroyOptions) {
    const one = await this.projectRepo.delete(options);
    return one;
  }

  async findById(id: string, options: FindOptions) {
    const one = await this.projectRepo.findOneById(id, options);
    return one;
  }
  async findOne(options: FindOptions) {
    const one = await this.projectRepo.findOne(options);
    return one;
  }

  async findByIdOrThrowError(id: string, options: FindOptions = {}) {
    const one = await this.findById(id, options);
    if (!one) {
      throw new UnprocessableEntityError("Request not found");
    }
    return one;
  }
  async findAll(options: FindOptions) {
    const all = await this.projectRepo.findAll(options);

    return all;
  }

  async findAllAndCount(options: FindAndCountOptions) {
    const admin = await this.projectRepo.findAndCountAll(options);
    return admin;
  }

  async count(options: CountOptions) {
    const count = await this.projectRepo.count(options);
    return count;
  }
  async updateOneByIdOrThrowError (id: string, data: any){
    await this.findByIdOrThrowError(id);
    const request = await this.update(data, {where : {id}, returning : true})
    return request
  }
    
}
export default new ProjectService();
