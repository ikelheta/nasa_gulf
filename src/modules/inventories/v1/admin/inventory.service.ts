import { IAdmin } from "../../../../shared/types/sharedTypes";
import {
  BadRequestError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import { PASSWORD_VALIDATION } from "../../../../shared/constant";
import Inventory from "../inventory.model";
import { BaseRepository } from "../../../../shared/baseRepository";
import {
  CountOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  Op,
  UpdateOptions,
} from "sequelize";
import Item from "../../../items/v1/item.model";
import InventoryItems from "../../../../shared/junctionTables/inventoryItems.model";

class InventoryService {
  inventoryRepo: BaseRepository<Inventory>;
  itemRepo: BaseRepository<Item>;
  inventoryItemsRepo: BaseRepository<InventoryItems>;

  constructor() {
    this.inventoryRepo = BaseRepository.getInstance(Inventory);
    this.itemRepo = BaseRepository.getInstance(Item);
    this.inventoryItemsRepo = BaseRepository.getInstance(InventoryItems);
  }
  async createOne(body: IAdmin) {
    const one = await this.inventoryRepo.create(body);
    return one;
  }
  async update(data: IAdmin, options: UpdateOptions) {
    const one = await this.inventoryRepo.update(data, options);
    return one;
  }

  async delete(options: DestroyOptions) {
    const one = await this.inventoryRepo.delete(options);
    return one;
  }

  async findById(id: string, options: FindOptions) {
    const one = await this.inventoryRepo.findOneById(id, options);
    return one;
  }
  async findOne(options: FindOptions) {
    const one = await this.inventoryRepo.findOne(options);
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
    const all = await this.inventoryRepo.findAll(options);

    return all;
  }

  async findAllAndCount(options: FindAndCountOptions) {
    const admin = await this.inventoryRepo.findAndCountAll(options);
    return admin;
  }

  async count(options: CountOptions) {
    const count = await this.inventoryRepo.count(options);
    return count;
  }
  async validateNameNotExistForCreate(name: string) {
    const exist = await this.inventoryRepo.findOne({
      where: {
        name,
      },
    });
    if (exist) {
      throw new BadRequestError("This name already exist");
    }
  }
  async validateNameNotExistForUpdate(id: string, name: string) {
    const exist = await this.inventoryRepo.findOne({
      where: {
        name,
        id: { [Op.ne]: id }
      },
    });
    if (exist) {
      throw new BadRequestError("This name already exist");
    }
  }
  async addItemsToInventoryStock(inventoryId: string, items: any[]) {
    for (let item of items) {
      const exist = await this.inventoryItemsRepo.findOne({ where: { inventoryId, itemId: item.id } })
      if (!exist) {
        await this.inventoryItemsRepo.create({ itemId: item.id, inventoryId, quantity: item.quantity })
      }
      if (exist) {
        await this.inventoryItemsRepo.update({ quantity: exist.quantity + item.quantity }, { where: { inventoryId, itemId: item.id } })
      }
    }
  }
}
export default new InventoryService();
