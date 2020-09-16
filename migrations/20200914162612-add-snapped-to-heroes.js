const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.addColumn('heroes', 'snapped', { type: Sequelize.BOOLEAN, defaultValue: 0 })

    return models.heroes.bulkCreate([
      { slug: 'spider-man', snapped: true }
    ], { updateOnDuplicate: ['snapped'] })
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('heroes', 'snapped')
  }
}
