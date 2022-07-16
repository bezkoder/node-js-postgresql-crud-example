module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
    },
    avatar: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.INTEGER
    },
    memberType: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date(),
    }
  });
  User.associate = (db) => {
    User.belongsToMany(db.roles, {
      through: "user_roles",
      foreignKey: "userId",
      as: 'roles',
      onDelete: 'CASCADE'
    })
    User.belongsToMany(db.organizations, {
      through: "user_organizations",
      foreignKey: "userId",
      as: 'organizations',
      onDelete: 'CASCADE'
    })
  };

  return User;
};