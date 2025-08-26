const { createShop, getShop, getOneShop, updateShop, deleteShop } = require("../controllers/shop.controller")

const router = require("express").Router()

router.post("/", createShop)
router.get("/", getShop)
router.get("/:id", getOneShop)
router.put("/:id", updateShop)
router.delete("/:id", deleteShop)

module.exports = router