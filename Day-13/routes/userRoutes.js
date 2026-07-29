const express = require("express");

const router = express.Router();

const {
    getUser,
    createUser,
    loginUser
} = require("../controllers/userController");

const validateUser = require("../middleware/validateUser");
const auth = require("../middleware/auth");


router.get("/:id", auth, getUser);

router.post("/", validateUser, createUser);

router.post("/login", loginUser);

module.exports = router;