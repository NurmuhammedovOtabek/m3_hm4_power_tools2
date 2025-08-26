const { userRegistr, is_active, userLogin } = require("../controllers/user.controller")

const router = require("express").Router()

router.post("/register", userRegistr)
router.post("/verify", is_active)
router.post("/login", userLogin)

module.exports = router
