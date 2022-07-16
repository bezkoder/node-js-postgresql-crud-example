const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.roles;

// const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const userController = require('./user.controller')
const roleController = require('./role.controller')
exports.signup = (req, res) => {
  // Save User to Database
  userController.findByEmail(req.body.email)
    .then(user => {
      if (user) {
        console.log('----------same email exist-----------')
        return res.send({ status: '403', message: "same email exist." });
      }

      else {
        console.log("=== this is new email ====")
        userController.creat({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
        })
          .then(user => {
            return res.send({ status: '200', user, message: "successfully registered" });
          })
          .catch(err => res.status(500).send({ message: err.message }))
      }
    })
};


exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    },
  })
    .then(user => {
      console.log('=====', user)
      if (!user) {
        return res.send({ status: '404', message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.send({
          status: '401',
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name.toUpperCase());
        }
        user.getOrganizations().then(org => {
          res.send({
            user: {
              status: '200',
              id: user.id,
              email: user.email,
              roles: authorities,
              access_token: token,
              organizations: org,
              roles: authorities,
            }
          })
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.verifyToken = (req, res) => {
  console.log('---- access token ----', req.body)
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    const user = await User.findByPk(decoded.id)
    if(!user) res.send({status: '404', message: 'User not found'})
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    var authorities = [];
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push(roles[i].name.toUpperCase());
      }
      user.getOrganizations().then(org => {
        res.send({
          user: {
            status: '200',
            id: user.id,
            email: user.email,
            roles: authorities,
            access_token: token,
            organizations: org,
            roles: authorities,
          }
        })
      });
    });
  });
}