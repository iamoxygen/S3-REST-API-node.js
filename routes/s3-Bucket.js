const router = require("express").Router();
const { listBucket } = require("../controller/s3-Buckets");
const { requireSignIn } = require("../middleware/auth");

router.get("/bucket/list", requireSignIn,listBucket);

module.exports = router;
