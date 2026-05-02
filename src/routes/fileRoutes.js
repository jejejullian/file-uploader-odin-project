const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// multer
const { upload } = require('../config/cloudinary');

router.use(isAuthenticated);

router.get('/:id', fileController.show);
router.post('/upload', upload.single('file_uploader'), fileController.upload);
router.post('/:id/delete', fileController.delete)


module.exports = router;

