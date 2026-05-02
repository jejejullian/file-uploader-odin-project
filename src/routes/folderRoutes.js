const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folderController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.use(isAuthenticated);

router.get("/", folderController.index);
router.get("/folders/create", folderController.getCreate);
router.post("/folders/create", folderController.postCreate);
router.get("/folders/:id", folderController.show);
router.get("/folders/:id/edit", folderController.getEdit);
router.post("/folders/:id/edit", folderController.postEdit);
router.post("/folders/:id/delete", folderController.delete);
router.post("/folders/:folderId/share", isAuthenticated, folderController.generateShareLink);

module.exports = router;
