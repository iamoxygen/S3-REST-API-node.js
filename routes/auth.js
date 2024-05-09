const router = require("express").Router();
const { login, register,userDetails,logout } = require("../controller/auth");
const { requireSignIn } = require("../middleware/auth");

router.post("/auth/login", login);
router.post("/auth/register", register);
router.get("/auth/logout", logout);
router.get("/user/info",requireSignIn, userDetails);

module.exports = router;
