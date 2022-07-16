module.exports = (sequelize, Sequelize) => {
    const Sandbox = sequelize.define("sandboxes", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal( 'uuid_generate_v4()' ),
            primaryKey: true,
        },
        environmentName: {
            type: Sequelize.STRING
        },
        environmentDomain: {
            type: Sequelize.STRING
        },
        version: {
            type: Sequelize.STRING
        },
        emailAddress: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        databaseType: {
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
    return Sandbox;
};