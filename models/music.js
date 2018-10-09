'use strict';
module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define('Music', {
    tags: DataTypes.ARRAY(DataTypes.TEXT)
  }, {});

  Music.associate = function(models) {
    // associations can be defined here
  };
  return Music;
};
