const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.addColumn('heroes', 'nemesis', { type: Sequelize.STRING })

    return models.heroes.bulkCreate([
      { slug: 'captain-america', snapped: true, nemesis: 'red-skull' },
      { slug: 'spider-man', nemesis: 'Doc Ock'},
      { slug: 'iron-man', nemesis: 'Iron Monger'}
    ], { updateOnDuplicate: ['nemesis'] })
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('heroes', 'nemesis')
  }
}
