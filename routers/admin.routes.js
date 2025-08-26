const router = require("express").Router()
const { createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin, adminLogin } = require("../controllers/admin.controller");


router.post("/", createAdmin);
router.post("/login", adminLogin);
router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);


module.exports = router;
