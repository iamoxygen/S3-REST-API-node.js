const router = require("express").Router();
const {
  listObject,
  deleteObject,
  getObject,
  uploadObject,
} = require("../controller/s3-Objects");

const upload = require("../config/multer");

router.post("/object/upload", upload.single("files"), uploadObject);
router.get("/object/get", getObject);
router.get("/object/list", listObject);
router.delete("/object/delete", deleteObject);

module.exports = router;
