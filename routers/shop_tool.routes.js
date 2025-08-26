const {
  createShop_tool,
  getShop_tool,
  getOneShop_tool,
  updateShop_tool,
  deleteShop_tool,
} = require("../controllers/shop_tool.controller");

const router = require("express").Router();

router.post("/", createShop_tool);
router.get("/", getShop_tool);
router.get("/:id", getOneShop_tool);
router.put("/:id", updateShop_tool);
router.delete("/:id", deleteShop_tool);

module.exports = router;
