const { authJwt } = require("../middleware");
const controller = require("../controllers/sandbox.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // app.get("/api/test/all");
    app.post("/api/sandbox/create", [authJwt.verifyToken], controller.create);
    
    // app.post('/api/getProjectById', [authJwt.verifyToken], controller.getProjectById);
    // app.post('/api/getProjectsBilling', [authJwt.verifyToken], controller.getProjectsBilling)
    // app.post('/api/deleteProject', [authJwt.verifyToken], controller.deleteProject)
};