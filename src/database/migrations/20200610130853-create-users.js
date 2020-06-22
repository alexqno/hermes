module.exports = {
  up: (queryInterface, Sequelize) => {
    const ret = queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Kamaleon',
          email: 'nfe@kamaleon.com.br',
          password: 'ow02-c99',
        },
      ],
      {}
    );

    return ret;
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};
