const path = require("path");

// Load ORM
const Sequelize = require('sequelize');

// The DATABASE_CONFIG_PATH environment variable contains the PATH of the data base configuration file.
// It is needed by autocorector.

const config_file = process.env.DATABASE_CONFIG_PATH || path.resolve(path.join(__dirname, '..', 'config', 'config.json'));
const config = require(config_file);

const sequelize = new Sequelize(config);

const Quiz = require('./quiz')(sequelize);
const Attachment = require('./attachment')(sequelize);
const User = require('./user')(sequelize);

// Relation 1-to-1 between Quiz and Attachment
Quiz.hasOne(Attachment, {as: 'attachment', foreignKey: 'quizId'});
Attachment.belongsTo(Quiz, {as: 'quiz', foreignKey: 'quizId'});

// Relation 1-to-N between User and Quiz:
User.hasMany(Quiz, {as: 'quizzes', foreignKey: 'authorId'});
Quiz.belongsTo(User, {as: 'author', foreignKey: 'authorId'});

module.exports = sequelize;

