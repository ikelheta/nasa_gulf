import { IOtp } from "../../../../shared/types/sharedTypes";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";
import Otp from "../otp.model";
import { BaseRepository } from "../../../../shared/baseRepository";
import {
  CountOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  UpdateOptions,
} from "sequelize";

class OtpService {
  otpRepo: BaseRepository<Otp>;
  constructor() {
    this.otpRepo = BaseRepository.getInstance(Otp);
  }
  async createOne(body: any) {
    const otp = await this.otpRepo.create(body);
    return otp;
  }
  async update(data: IOtp, options: UpdateOptions) {
    const otp = await this.otpRepo.update(data, options);
    return otp;
  }

  async delete(options: DestroyOptions) {
    const otp = await this.otpRepo.delete(options);
    return otp;
  }

  async findById(id: string, options: FindOptions) {
    const otp = await this.otpRepo.findOneById(id, options);
    return otp;
  }
  async findOne(options: FindOptions) {
    const otp = await this.otpRepo.findOne(options);
    return otp;
  }

  async findByIdOrThrowError(id: string, options: FindOptions) {
    const otp = await this.findById(id, options);
    if (!otp) {
      throw new UnprocessableEntityError("Otp not found");
    }
    return otp;
  }
  async findAll(options: FindOptions) {
    const otp = await this.otpRepo.findAll(options);

    return otp;
  }

  async findAllAndCount(options: FindAndCountOptions) {
    const otp = await this.otpRepo.findAndCountAll(options);
    return otp;
  }

  async count(options: CountOptions) {
    const count = await this.otpRepo.count(options);
    return count;
  }

  async deletePermanently(options: DestroyOptions) {
    const deviceToken = await this.otpRepo.deletePermanently(options)
    return deviceToken
  }
}
export default new OtpService()
