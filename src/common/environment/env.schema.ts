import * as Joi from "joi";
import { EnvironmentVariables } from "./env.type";

export const envValidationSchema = Joi.object<EnvironmentVariables, true>({
  JWT_SECRET_KEY: Joi.string().alphanum().min(5).max(255).required(),
  JWT_TTL_IN_MS: Joi.number().required(),
  PORT: Joi.number().optional().default(3000),
});
