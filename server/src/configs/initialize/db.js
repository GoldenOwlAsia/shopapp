'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
import { dbConfig as config } from 'configs/env';
const db = {};

console.log('config: ', config);

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(path.join(__dirname, '../../modules/'))
  .forEach((file) => {
    const dirName = path.join(__dirname, `../../modules/${file}`)
    fs.readdirSync(dirName)
      .forEach((modulesFile) => {
        if(modulesFile.indexOf('.') !== 0 && (modulesFile.slice(-3) === '.js') && (modulesFile.toLowerCase().includes('model'))) {
          const model = sequelize['import'](path.join(__dirname, `../../modules/${file}/${modulesFile}`));
          db[model.name] = model;
        }
      });
  });

Object.keys(db).forEach((modelName) => {
  console.log(db[modelName]);
  if (db[modelName].options.classMethods && db[modelName].options.classMethods.associate) {
    db[modelName].options.classMethods.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize.sync();


export default db;
