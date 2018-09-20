import Joi from '../../utils/pjoi';

export const createUserSchema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  password: Joi.string().required(),
  email: Joi.string(),
  fullName: Joi.string().required(),
  salary: Joi.number(),
  bonus: Joi.number(),
  note: Joi.string(),
  CMND: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string(),
  username: Joi.string().required(),
  role: Joi.string().required(),
  dateOfBirth: Joi.string(),
  avatar: Joi.string()
});

export const ChangePasswordRequest = Joi.object().keys({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});
