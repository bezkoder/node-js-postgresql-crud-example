const db = require("../models");
const User = db.users;
const userController = require('./user.controller')
const Organization = db.organizations;
const Project = db.projects;
const Sandbox = db.sandboxes;

exports.create = async (req, res) => {
	console.log("==== body ===", req.body)
	const sandbox = {
		environmentName: req.body.environmentName,
		environmentDomain: req.body.environmentDomain,
		version: req.body.version,
		emailAddress: req.body.emailAddress,
		password: req.body.password,
		databaseType: req.body.databaseType,
		projectId: req.body.projectId,
	};

	const user = await userController.findByEmail(req.body.presentEmail)
	if(user) Sandbox.create(sandbox).then(data => res.send({status: '200', data}))
				.catch(err => res.send({status: '500', message: 'Server Error' + err}))
	else res.send({status: '404', message: 'No such UserEmail found'})
};