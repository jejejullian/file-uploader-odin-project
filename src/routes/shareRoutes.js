const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folderController");

router.get("/share/:uuid", folderController.showPublicFolder);

module.exports = router;