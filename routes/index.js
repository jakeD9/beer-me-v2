const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth");


router.use(apiRoutes);
router.use("/auth", authRoutes);

module.exports = router;