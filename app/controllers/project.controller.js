const db = require("../models");
const User = db.users;
const Organization = db.organizations;
const Project = db.projects;
const Billing = db.billings;

exports.create = (req, res) => {
    console.log("==== body ===", req.body)
    const project = {
        projectName: req.body.name,
        serverRegion: req.body.region,
        organizationId: req.body.orgId,
    };

    // Save Tutorial in the database
    Project.create(project)
        .then(data => {
            res.send({ status: '200', data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.getProjectById = async (req, res) => {
    console.log('--- get project by id ---', req.body)
    const project = await Project.findByPk(req.body.projectId)
    if (project) {
        const sandboxes = await project.getSandboxes();
        res.send({ status: '200', sandboxes })
    }
    else res.send({ status: '404', message: 'No found such project' })
}
// exports.getProjectWithId = async (id) => {
//     const project = await Project.findByPk(id)
//     if (project) {
//         const sandboxes = await project.getSandboxes();
//         return sandboxes;
//     }
//     else return null
// }
exports.getProjectsBilling = async (req, res) => {
    const ids = req.body.projectIds
    console.log('=== projectIds ===', ids)
    if (ids.length == 0) return 0;
    let billingArray = []

    await Promise.all(

        ids.map(async (id, i) => {
            const project = await Project.findByPk(id);
            const bill = await project.getBillings();
            billingArray.push(bill);
        }),
    )

    res.send({ status: '200', billingArray })
}
exports.deleteProject = async (req, res) => {
    const projectId = req.body.projectId
    console.log('--- delete project id ---', projectId)
    const project = await Project.findByPk(projectId);
    if (project) await project.destroy().then(data => res.send({ status: '200', data }))
        .catch(err => res.send({ status: '500', message: 'Server error' }))
    else res.send({ status: '404', message: 'Project not found' })
}