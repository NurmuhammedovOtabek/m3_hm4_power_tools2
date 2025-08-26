const { createdistric, getdistrict, findByNameD, getOnedistrict, updatedistrict, deletedistrict } = require("../controllers/distric.controller");

const router = require("express").Router();
  
router.post("/",createdistric)
router.get("/", getdistrict)
router.get("/", findByNameD)
router.get("/:id", getOnedistrict)
router.put("/:id", updatedistrict)
router.delete("/:id", deletedistrict)
  
module.exports = router;
  