module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal( 'uuid_generate_v4()' ),
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
  });
  Role.associate = (db) => {
    Role.belongsToMany(db.users, {
      through: "user_roles",
      foreignKey: "roleId"
    })
  }
  return Role;
};