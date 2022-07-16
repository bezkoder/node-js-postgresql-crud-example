module.exports = (sequelize, Sequelize) => {
    const Billing = sequelize.define("billings", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            primaryKey: true,
        },
        number: {
            type: Sequelize.INTEGER
        },
        from: {
            type: Sequelize.DATE,
        },
        to: {
            type: Sequelize.DATE,
        },
        cost: {
            type: Sequelize.FLOAT,
            defaultValue: 0.00,
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

    return Billing;
};
