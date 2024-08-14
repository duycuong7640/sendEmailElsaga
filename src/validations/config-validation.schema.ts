import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.string().required(),
  API_KEY: Joi.string().required(),
  API_TOKEN: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  POSTGRES_DIR: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),

  MAIL_NAME: Joi.string().required(),
  MAIL_HOST: Joi.string().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  MAIL_FROM: Joi.string().required(),
});
