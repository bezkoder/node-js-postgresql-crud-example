module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("projects", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal( 'uuid_generate_v4()' ),
            primaryKey: true,
        },
        projectName: {
            type: Sequelize.STRING
        },
        serverRegion: {
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
    Project.associate = (db) => {
      Project.hasMany(db.sandboxes, {
          foreignKey: "projectId",
          as: 'sandboxes',
          onDelete: 'CASCADE'
      }),
      Project.hasMany(db.billings, {
          foreignKey: "projectId",
          as: 'billings',
          onDelete: 'CASCADE'
      })
  };
    return Project;
};