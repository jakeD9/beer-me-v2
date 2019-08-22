const router = require("express").Router();

// /api/all/x routes
router.route("/beers")
    .get((req, res) => {
        res.send("Get beers");
    })



module.exports = router;