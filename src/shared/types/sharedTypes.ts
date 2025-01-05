import { FindAttributeOptions } from "sequelize";

export interface PAGINATION_QUERY {
  pageNumber?: string;
  limit?: string;
  order?: string;
  orderBy?: string;
}

export type FiltersObject = {
  [key: string]: string | number | object | boolean | null;
};

export interface FindAllQueryOptions {
  limit?: number;
  offset?: number;
  filter?: any;
  attributes?: FindAttributeOptions;
  include?: any;
  order?: any;
  through?: any;
  group?: any;
  userId?: string;
  distinct?: boolean;
  where?: any;
  raw?: boolean;
  transaction?: any;
  having?: any;
  nest?: boolean;
  subQuery?: boolean;
}
export interface FindByIdQueryOptions {
  filter?: any;
  attributes?: FindAttributeOptions;
  include?: any;
  order?: any;
  through?: any;
  group?: any;
}

export type FindAllDTO<T> = { count: number; rows: T[] };

export interface IAdmin {
  id?: string;
  image?: string;
  name?: string;
  email?: string;
  password?: string;
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface IEmployee{
  id?: string;
  image?: string;
  name?: string;
  email?: string;
  password?: string;
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IOtp {
  id?: string;
  otp?: string;
  validTo?: Date;
  adminId?: string;
}

export interface IHero {
  id?: string;
  body?: string;
}

export interface IOurServices {
  id?: string;
  body?: string;
  services?: {
    icon?: string;
    title?: string;
    body?: string;
  }[];
}

export interface IServices {
  icon?: string;
  title?: string;
  body?: string;
}
