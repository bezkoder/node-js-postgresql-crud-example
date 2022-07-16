const db = require('../models')
const User = db.users;
const Role = db.roles;

exports.creat = (user) => {
  return User.create({
    firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password
  }).then(user => { return user }).catch((err) => { throw new Error(err) })
}

exports.findAll = () => {
  return User.findAll({
    include: [
      {
        model: Role,
        as: "roles",
        attributes: ["name"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Users: ", err);
    });
};

exports.findById  = (id) => {
  return User.findByPk(id, {
    include: [
      {
        model: Role,
        as: "roles",
        attributes: ["name"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Users: ", err);
    });
};

exports.findByEmail = (email) => {
  return User.findOne({
    where: {
      email: email
    }
  }).then(user => {
    console.log('user-----', user)
    if(!user) return null
    else return user
  }).catch(err => {
    throw new Error(err)
  })
}

exports.addRole = (userId, roleId) => {
  return User.findByPk(userId).then((user) => {
    if(!user) {
      console.log("User not found") 
      return null
    }
    return Role.findByPk(roleId).then((role)=> {
      if(!role) {
        console.log("Role not found");
        return null;
      }
      user.addRole(role);
      console.log(`>> added role name=${role.name} to User name=${user.firstName}`)
      return user;
    })
  }).catch((err)=>{
    console.log(">> Error while adding Role to User: ", err);
  })
}

