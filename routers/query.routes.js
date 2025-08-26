const { ToolSearchShop, searchUser, query3 } = require("../controllers/query.controller")

const router = require("express").Router()

router.post("/searchTool", ToolSearchShop)
router.post("/searchUser", searchUser)
router.post("/query3", query3)

module.exports = router