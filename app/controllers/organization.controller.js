const db = require("../models");
const User = db.users;
const Organization = db.organizations;
const Project = db.projects;
const Sandbox = db.sandboxes;
const projectController = require('./project.controller')

exports.create = async (req, res) => {
	console.log("==== body ===", req.body)
	const organization = {
		organizationName: req.body.data.organizationName,
		companyName: req.body.data.companyName,
		primaryEmail: req.body.data.primaryEmail,
		phoneNumber: req.body.data.phoneNumber,
		address1: req.body.data.address1,
		address2: req.body.data.address2,
		city: req.body.data.city,
		zipCode: req.body.data.zipCode,
		country: req.body.data.country,
		region: req.body.data.region,
		// userId: req.body.data.userId,
	};

	// many to many relationship data create
	User.findByPk(req.body.data.userId).then(user => {
		if (user) user.createOrganization(organization).then(result => res.send({ status: '200', result }))
	})
};
exports.getProjects = async (req, res) => {
	// console.log("===========  get projects  ===========", req.body)
	const orgId = req.body.orgId
	// const org = await Organization.findByPk(orgId)
	const projects = await Project.findAll({where: {organizationId: orgId}}, {
		include: [{
			model: Organization,
		}]
	})
	console.log("======== projects with sandbox =======", projects)

	return res.send({ status: '200', projects });

};


	// let projects = await org.getProjects()
	// await Promise.all(
	// 	projects.map(async(project, i) => {
	// 		project.sandbox = projectController.getProjectWithId(project.id)
	// 	})
	// )