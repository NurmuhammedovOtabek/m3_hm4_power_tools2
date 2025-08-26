const router = require("express").Router()
const userRouter = require("./user.routers")
const districtRouter = require("./distic.routers")
const toolRouter = require("./tool.router")
const shopRouter = require("./shop.routes")
const shop_toolRouter = require("./shop_tool.routes")
const ordersRouter = require("./orders.routes")
const queryRouter = require("./query.routes")
const adminRouter = require("./admin.routes")

router.use("/user", userRouter)
router.use("/district", districtRouter)
router.use("/tool", toolRouter)
router.use("/shop", shopRouter)
router.use("/shop_tool", shop_toolRouter)
router.use("/orders", ordersRouter)
router.use("/query", queryRouter)
router.use("/admin", adminRouter)


module.exports = router