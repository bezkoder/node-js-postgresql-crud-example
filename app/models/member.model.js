module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("members", {
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
    Member.associate = (db) => {
        Member.belongsToMany(db.roles, {
        through: "member_roles",
        foreignKey: "memberId",
        onDelete: 'CASCADE'
      })
    }
  
    return Member;
  };