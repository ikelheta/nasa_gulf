import { IAdmin } from "../../../../shared/types/sharedTypes";
import {
  AppError,
  BadRequestError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import { PASSWORD_VALIDATION } from "../../../../shared/constant";
import Project from "../projects.model";
import { BaseRepository } from "../../../../shared/baseRepository";
import contractorServ from "../../../contractor/v1/dashboard/contractor.service";
import {
  CountOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  Op,
  UpdateOptions,
} from "sequelize";
import sequelize from "../../../../config/db/config";
import ProjectEngineers from "../../../../shared/junctionTables/projectEmployees.model";
import ProjectSubContractors from "../../../../shared/junctionTables/projectsSubContractors.mode";

class ProjectService {
  projectRepo: BaseRepository<Project>;

  constructor() {
    this.projectRepo = BaseRepository.getInstance(Project);
  }
  async createOne(body: any) {
    const { engineersIds, subCotractorId } = body;
    const transaction = await sequelize.transaction();
    try {
      const one = await this.projectRepo.create(body, { transaction });

      if (engineersIds?.length) {
        await ProjectEngineers.bulkCreate(
          engineersIds.map((ele) => ({ engineerId: ele, projectId: one.id })),
          {
            transaction,
          }
        );
      }
      if (subCotractorId?.length) {
        await ProjectSubContractors.bulkCreate(
          subCotractorId.map((ele) => ({ contractorId: ele, projectId: one.id })),
          {
            transaction,
          }
        );
      }

      transaction.commit();
      return one;
    } catch (error) {
      await transaction.rollback();
      throw new AppError(error)
    }
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
      throw new UnprocessableEntityError("Project not found");
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
  async updateOneById (id: string, data: any){
    const { engineersIds, subCotractorId } = data;

    const transaction = await sequelize.transaction();
    try {
      const one = await this.projectRepo.updateOneByIdOrThrowError(id, data);

      if (engineersIds?.length) {
        await ProjectEngineers.destroy({where : {projectId : id}, force : true})
        await ProjectEngineers.bulkCreate(
          engineersIds.map((ele) => ({ engineerId: ele, projectId:id})),
          {
            transaction,
          }
        );
      }
      if (subCotractorId?.length) {
        await ProjectSubContractors.destroy({where : {projectId : id},  force : true})

        await ProjectSubContractors.bulkCreate(
          subCotractorId.map((ele) => ({ contractorId: ele, projectId: id})),
          {
            transaction,
          }
        );
      }

      transaction.commit();
      return one;
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      throw new AppError(error)
    }
  }
}
export default new ProjectService();
