'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // use the id field generated in migration since it is a primary key field
  }, {});
  User.associate = function(models) {
    // User associations
    User.belongsToMany(models.Music, {
      as: 'playList',
      through: 'UserPlaylist',
      foreignKey: 'userId',
      otherKey: 'musicId'
    })

    User.belongsToMany(models.User, { 
      as: 'followers', 
      through: 'UserFollower',
      foreignKey: 'userId',
      otherKey: 'followerId'
    })

  }
  
  sequelize.sync()
  return User;
};
