import { string, boolean, object } from "yup";

export const purchaseBodySchema = object({
  cardName: string().required(),
  cardNumber: string().required(),
  cardExpiration: string().required(),
  cardCvv: string().required(),
}).noUnknown(true).strict();

export const reviewBodySchema = object({
  isRecommended: boolean().required(),
  text: string().required()
}).noUnknown(true).strict();

export const registerBodySchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
  image: string().url().required(),
  backgroundImage: string().url().required(),
}).noUnknown(true).strict();

export const loginBodySchema = object({
  email: string().email().required(),
  password: string().required(),
}).noUnknown(true).strict();