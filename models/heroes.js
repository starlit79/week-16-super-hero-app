const heroes = (connection, Sequelize) => {
  return connection.define('heroes', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    realname: { type: Sequelize.STRING },
    firstappearance: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING, unique: true },
    snapped: { type: Sequelize.BOOLEAN, defaultValue: 0 },
  }, { paranoid: true })
}

module.exports = heroes
