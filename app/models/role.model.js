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
  Role.associate = (db) => {
    Role.belongsToMany(db.users, {
      through: "user_roles",
      as: 'users',
      foreignKey: "roleId",
      onDelete: 'CASCADE'
    })
  }

//   const roles = [{name: 'view'}, {name: 'team'}, {name: 'financial'}, {name: 'organization'}, {name: 'project'}
//   , {name: 'environment'}, {name: 'sandbox'}]

//   sequelize.sync({force: true}).then(() => {

//     Role.bulkCreate(roles).then(() => {
//         console.log('table created');
//     }).finally(() => {
//         console.log('closed====')
//     });
// });

  return Role;
};