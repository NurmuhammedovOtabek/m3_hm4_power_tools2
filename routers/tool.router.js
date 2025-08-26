const { createTool, getTool, getOneTool, updateTool, deleteTool } = require("../controllers/tool.controller")

const router = require("express").Router()

router.post("/", createTool)
router.get("/", getTool)
router.get("/:id", getOneTool)
router.put("/:id", updateTool)
router.delete("/:id", deleteTool)

module.exports = router