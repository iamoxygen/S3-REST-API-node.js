const router = require("express").Router();
const { listBucket } = require("../controller/s3-Buckets");


router.get("/bucket/list", listBucket);

module.exports = router;
