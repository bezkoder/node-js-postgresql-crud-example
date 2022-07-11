module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal( 'uuid_generate_v4()' ),
      primaryKey: true,
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
    User.hasMany(db.organizations, {
      foreignKey: "userId"
    })
  };
  User.associate = (db) => {
    User.belongsToMany(db.roles, {
      through: "user_roles",
      foreignKey: "userId"
    })
  }

  return User;
};