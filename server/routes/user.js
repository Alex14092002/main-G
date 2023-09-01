const router = require("express").Router();
const controllers = require("../controllers/user.js");
const { verifyLoginToken, isAdmin } = require("../middlewares/verifyToken.js");

router.post("/register", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.get("/current", verifyLoginToken, controllers.getUser);
router.post("/refreshtoken", controllers.refreshLoginToken);
router.get("/logout", controllers.logout);
router.get("/forgotpassword", controllers.forgotPassword);
router.put("/resetpassword", controllers.resetPassword);
router.get("/", [verifyLoginToken, isAdmin], controllers.getAllUsers);
router.delete("/", [verifyLoginToken, isAdmin], controllers.deleteUser);
router.put("/current", [verifyLoginToken], controllers.updateUserByUser);
router.put("/:uid", [verifyLoginToken, isAdmin], controllers.updateUserByAdmin);

module.exports = router;
