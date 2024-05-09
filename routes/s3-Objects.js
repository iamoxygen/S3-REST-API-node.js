const router = require("express").Router();
const {
  listObject,
  deleteObject,
  getObject,
  uploadObject,
} = require("../controller/s3-Objects");

const upload = require("../config/multer");
const { requireSignIn } = require("../middleware/auth");

router.post(
  "/object/upload",
  requireSignIn,
  upload.single("files"),
  uploadObject
);
router.get("/object/get", requireSignIn, getObject);
router.get("/object/list", requireSignIn, listObject);
router.delete("/object/delete", requireSignIn, deleteObject);

module.exports = router;
