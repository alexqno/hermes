import Sequelize from 'sequelize';

import User from '../app/models/User';
import Profile from '../app/models/Profile';

import databaseConfig from '../config/database';

const models = [User, Profile];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
