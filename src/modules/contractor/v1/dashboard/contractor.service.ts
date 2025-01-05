import { IAdmin } from "../../../../shared/types/sharedTypes";
import {
  BadRequestError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import { PASSWORD_VALIDATION } from "../../../../shared/constant";
import Contractor from "../contractor.model";
import { BaseRepository } from "../../../../shared/baseRepository";
import {
  CountOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  Op,
  UpdateOptions,
} from "sequelize";

class ContractorService {
  contractorRepo: BaseRepository<Contractor>;

  constructor() {
    this.contractorRepo = BaseRepository.getInstance(Contractor);
  }
  async createOne(body: IAdmin) {
    const one = await this.contractorRepo.create(body);
    return one;
  }
  async update(data: IAdmin, options: UpdateOptions) {
    const one = await this.contractorRepo.update(data, options);
    return one;
  }

  async delete(options: DestroyOptions) {
    const one = await this.contractorRepo.delete(options);
    return one;
  }

  async findById(id: string, options: FindOptions) {
    const one = await this.contractorRepo.findOneById(id, options);
    return one;
  }
  async findOne(options: FindOptions) {
    const one = await this.contractorRepo.findOne(options);
    return one;
  }

  async findByIdOrThrowError(id: string, options: FindOptions = {}) {
    const one = await this.findById(id, options);
    if (!one) {
      throw new UnprocessableEntityError("Admin not found");
    }
    return one;
  }
  async findAll(options: FindOptions) {
    const all = await this.contractorRepo.findAll(options);

    return all;
  }

  async findAllAndCount(options: FindAndCountOptions) {
    const admin = await this.contractorRepo.findAndCountAll(options);
    return admin;
  }

  async count(options: CountOptions) {
    const count = await this.contractorRepo.count(options);
    return count;
  }
  async validateNameNotExistForCreate(nameEn: string, nameAr: string) {
    const exist = await this.contractorRepo.findOne({
      where: {
        [Op.or]: [{ nameEn }, { nameAr }],
      },
    });
    if (exist) {
      throw new BadRequestError("This name already exist");
    }
  }
  async validateEmailNotExistForCreate(email: string) {
    const exist = await this.contractorRepo.findOne({
      where: { email },
    });
    if (exist) {
      throw new BadRequestError("This email already exist");
    }
  }
  async validateEmailNotExistForUpdate(email: string, id: string) {
    const exist = await this.contractorRepo.findOne({
      where: { email, id: { [Op.ne]: id } },
    });
    if (exist) {
      throw new BadRequestError("This email already exist");
    }
  }
  async validateNameEnNotExistForUpdate(
    nameEn: string,
    id: string
  ) {
    const exist = await this.contractorRepo.findOne({
      where: { nameEn, id: { [Op.ne]: id } },
    });
    if (exist) {
      throw new BadRequestError("This nameEn already exist");
    }
  }
  async validateNameArNotExistForUpdate(
    nameAr: string,
    id: string
  ) {
    const exist = await this.contractorRepo.findOne({
      where: { nameAr, id: { [Op.ne]: id } },
    });
    if (exist) {
      throw new BadRequestError("This nameAr already exist");
    }
  }
}
export default new ContractorService();
