const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/uploadFile');
const {
  createCoverLetter,
  saveTemplateToDb,
} = require('../controllers/coverLetterController');

// router.post('/create', createCoverLetter);
router.get('/create', createCoverLetter);
router.post('/save', upload.single('template'), saveTemplateToDb);

module.exports = router;
