const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/all");
    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );
    app.get(
        "/api/test/mod",
        [authJwt.verifyToken],
        controller.moderatorBoard
    );
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken],
        controller.adminBoard
    );
};