import Joi from 'joi'

export const signupSchema = Joi.object({
  firstName: Joi.string().required().max(50),
  lastName: Joi.string().required().max(50),
  user: Joi.string().required().max(30),
  email: Joi.string().email({ tlds: { allow: false } }).required().max(100),
  password: Joi.string().required().max(50).message('A senha deve ter no máximo {{#limit}} caracteres').min(6).message('A senha deve ter no mínimo {{#limit}} caracteres'),
})

export const loginSchema = Joi.object({
  userOrEmail: Joi.string().required(),
  password: Joi.string().required().max(50).message('A senha deve ter no máximo {{#limit}} caracteres').min(6).message('A senha deve ter no mínimo {{#limit}} caracteres'),
})