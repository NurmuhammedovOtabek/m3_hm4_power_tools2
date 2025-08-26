const {
    createOrders,
    getOrders,
    getOneorders,
    updateorders,
    deleteOrders,
} = require("../controllers/orders.controller");
  
const router = require("express").Router();
  
router.post("/", createOrders);
router.get("/", getOrders);
router.get("/:id", getOneorders);
router.put("/:id", updateorders);
router.delete("/:id", deleteOrders);
  
module.exports = router;
  