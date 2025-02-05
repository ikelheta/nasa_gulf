import _ from "lodash";
import { NextFunction, Response, Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import inventoryServ from "./inventory.service";
import { AuthenticationRequest } from "../../../../shared/interfaces";
import {
  validateUpdate,
  validateCreate,
  validateAddToStock
} from "./inventory.validator";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { validateUUID } from "../../../../shared/utils/general-functions";
import { Op } from "sequelize";
import itemService from "../../../items/v1/admin/item.service";
import InventoryItems from "../../../../shared/junctionTables/inventoryItems.model";
import Item from "../../../items/v1/item.model";

export async function findAll(req: Request, res: Response) {
  const { order, orderBy, limit, offset } = handlePaginationSort(req.query);
  const { search } = req.query;
  let filter: any = {};
  if (search) {
    filter = {
      name : {[Op.iLike]:`%${search}%` }
    };
  }
  const data = await inventoryServ.findAllAndCount({
    where: filter,
    order: [[orderBy, order]],
    limit,
    offset,
  });
  res.json({
    data,
    message: null,
  });
}
export async function create(req: Request, res: Response) {
  validateCreate(req.body);
  const { name } = req.body;
  await inventoryServ.validateNameNotExistForCreate(name);

  const data = await inventoryServ.createOne(req.body);
  res.json({
    data,
    message: null,
  });
}
export async function update(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  validateUpdate(req.body);
  const { name } = req.body;
  if (name) {
    await inventoryServ.validateNameNotExistForUpdate(id, name);
  }

  const data = await inventoryServ.update(req.body, { where: { id } });
  res.json({
    data,
    message: null,
  });
}
export async function findOne(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const data = await inventoryServ.findByIdOrThrowError(id);
  res.json({
    data,
    message: null,
  });
}
export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const data = await inventoryServ.delete({ where: { id } });
  res.json({
    data,
    message: null,
  });
}

export async function  addToStock (req, res){
  validateAddToStock(req.body);
  const {items, inventoryId} = req.body
  await inventoryServ.findByIdOrThrowError(inventoryId)
  const existedItems = await itemService.count({where : {id : {[Op.in]: items.map((item)=> item.id)}}})
  if(existedItems != items.length){
    throw new BadRequestError("There is an item that is not exist")
  }
  await inventoryServ.addItemsToInventoryStock(inventoryId, items)
  res.json({
    data : {},
    message: 'Items added to stock successfully',
  });
}
export async function  getCurrentStock (req, res){
  const {id} = req.params
  const inventoryStck  = await inventoryServ.findByIdOrThrowError(id, {include : [{model : Item}]})
  res.json({
    data : inventoryStck,
    message: null
  });
}
