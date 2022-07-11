module.exports = (sequelize, Sequelize) => {
    const Organization = sequelize.define("organizations", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            primaryKey: true,
        },
        avatar: {
            type: Sequelize.STRING
        },
        organizationName: {
            type: Sequelize.STRING
        },
        companyName: {
            type: Sequelize.STRING
        },
        primaryEmail: {
            type: Sequelize.STRING
        },
        billingEmail: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        address1: {
            type: Sequelize.STRING
        },
        address2: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        zipCode: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        region: {
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
    Organization.associate = (db) => {
        Organization.hasMany(db.projects, {
            foreignKey: "organizationId"
        })
    };
    
    Organization.associate = (db) => {
        Organization.hasMany(db.billings, {
            foreignKey: "organizationId"
        })
    };
    
    Organization.associate = (db) => {
        Organization.hasMany(db.members, {
            foreignKey: "organizationId"
        })
    };

    return Organization;
};