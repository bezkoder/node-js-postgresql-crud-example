const db = require("../models");
const Role = db.roles;
const User = db.users;

exports.create = async (role) => {
    const exist = await this.findByName(role.name)
    if(exist) return exist
    return Role.create({
        name: role.name,
    })
        .then((role) => {
            console.log(">> Created Role: " + JSON.stringify(role, null, 4));
            return role;
        })
        .catch((err) => {
            console.log(">> Error while creating Role: ", err);
        });
};

exports.findAll = () => {
    return Role.findAll({
        include: [
            {
                model: User,
                as: "users",
                attributes: ["id", "firstName", "lastName", "email", "phoneNumber"],
                through: {
                    attributes: [],
                },
                // through: {
                //   attributes: ["tag_id", "tutorial_id"],
                // },
            },
        ],
    })
        .then((roles) => {
            return roles;
        })
        .catch((err) => {
            console.log(">> Error while retrieving Roles: ", err);
        });
};
exports.findById = (id) => {
    return Role.findById(id, {
        include: [
            {
                model: User,
                as: "users",
                attributes: ["id", "firstName", "lastName", "email", "phoneNumber"],
                through: {
                    attributes: [],
                },
                // through: {
                //   attributes: ["tag_id", "tutorial_id"],
                // },
            },
        ],
    })
        .then((roles) => {
            return roles;
        })
        .catch((err) => {
            console.log(">> Error while retrieving Roles: ", err);
        });
};
exports.findByName = (name) => {
    // console.log('============================', name)
    return Role.findOne({
        where: {
            name
        }
    }).then(role => {
        if (!role) return null
        return role;
    })
}