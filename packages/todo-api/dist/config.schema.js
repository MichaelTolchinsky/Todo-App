"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configValidationSchema = void 0;
const Joi = require("@hapi/joi");
exports.configValidationSchema = Joi.object({
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().default(5432).required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
});
//# sourceMappingURL=config.schema.js.map