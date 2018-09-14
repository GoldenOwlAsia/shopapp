import Joi from '../../utils/pjoi';

export const createUserSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string(),
  phoneNumber: Joi.string().required(),
  address: Joi.string(),
  username: Joi.string().required(),
  role: Joi.string().required(),
  dateOfBirth: Joi.string()
});

export const ChangePasswordRequest = Joi.object().keys({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});
