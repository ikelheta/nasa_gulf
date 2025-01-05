import { Request } from "express";

export interface MulterRequest extends Request {
  file: any;
  files: any[];
}

export interface AuthenticationRequest extends Request {
  user: any;
}

export interface AboutUsSectionDTO {
  icon: string;
  title: string;
  body: string;
}

export interface AboutUsDTO {
  id?: string;
  body?: string;
  images?: string[];
  sections?: AboutUsSectionDTO[];
}

export interface ClosingBannerDTO {
  id?: string;
  body?: string;
  title?: string;
}
export interface FaqsQuestionsDTO {
  id?: string;
  body?: string;
  title?: string;
  icon?: string;
  faqsId?: string;
}

export interface FaqsDTO {
  id?: string;
  body?: string;
  title?: string;
  questions?: FaqsQuestionsDTO[];
}

export interface ContactUsDTO {
  id?: string;
  email?: string;
  phoneNumber?: string;
  location?: AboutUsSectionDTO;
}
export interface ContactUsMessagesDTO {
  id?: string;
  email?: string;
  phoneNumber?: string;
  message?: AboutUsSectionDTO;
  name?: AboutUsSectionDTO;
}
