import { Sequelize } from 'sequelize';

const dbConfig = {
  HOST: 'postgres',
  USER: 'postgres',
  PASSWORD: 'example',
  DB: 'postgres',
  dialect: 'postgres',
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Users = (await import('./users/index.js')).default(sequelize, Sequelize);
db.Tasks = (await import('./tasks/index.js')).default(sequelize, Sequelize);

db.Tasks.belongsTo(db.Users, { foreignKey: 'user_id' });
db.Users.hasMany(db.Tasks, { foreignKey: 'user_id' });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

export default db;
