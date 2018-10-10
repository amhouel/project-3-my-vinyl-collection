const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/project_3_db', {
  dialect: 'postgres'
});

// Create models here
const User = sequelize.define('user', {
  name: Sequelize.TEXT,
  username: Sequelize.TEXT,
  passwordDigest: { type: Sequelize.TEXT, unique: true },
  pictureSrc: Sequelize.TEXT,
  email: Sequelize.TEXT,
  city: Sequelize.TEXT
});

const Album = sequelize.define('album', {
  title: Sequelize.TEXT,
  artist: Sequelize.TEXT,
  releaseYear: Sequelize.INTEGER,
  genre: Sequelize.TEXT,
  coverPictureSrc: { type: Sequelize.TEXT, defaultValue: 'vinyl-record-placeholder.png' },
  rating: Sequelize.INTEGER,
  description: Sequelize.TEXT
});

const UserAlbums = sequelize.define('userAlbums');
User.belongsToMany(Album, { through: UserAlbums });
Album.belongsToMany(User, { through: UserAlbums });

// Export models
module.exports = {
  User,
  Album,
  UserAlbums,
  sequelize: sequelize
};

