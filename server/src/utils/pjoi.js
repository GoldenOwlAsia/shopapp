import Joi from 'joi';
import { ValidationError } from './errors';

let instance = null;

/**
 * 1. Make `validate` a promise.
 * 2. Use internal ValidationError class.
 */
class PromiseJoi {
  constructor() {
    if (!instance) {
      instance = Object.assign({}, Joi);
      instance.validate = function(data, schema) {
        return new Promise((resolve, reject) => {
          Joi.validate(data, schema, (err, value) => {
            if (err !== null) {
              if (err.name === 'ValidationError') {
                const validationError = new ValidationError(err.message);
                validationError.name = err.name;
                validationError.details = err.details;
                validationError.annotated = err.annotate();
                reject(validationError);
              } else {
                reject(err);
              }
            } else {
              resolve(value);
            }
          });
        });
      };
    }
    return instance;
  }
}

module.exports = instance || new PromiseJoi();
