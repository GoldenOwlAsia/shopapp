import Joi from '../../utils/pjoi';

export const LoginParams = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const CreateUserTokenSchema = Joi.object().keys({
  token: Joi.string().required(),
  userId: Joi.number().integer().required(),
  expiredAt: Joi.string().required()
})