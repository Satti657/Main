const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", auth, admin, (req, res) => {

    res.json({
        success: true,
        message: "Welcome Admin!"
    });

});

module.exports = router;