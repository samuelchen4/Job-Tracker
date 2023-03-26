const express = require('express');
const router = express.Router();
const { verifyUrl } = require('../middleware/verifyUrl');
const { getJobs, addJob, parseJob } = require('../controllers/jobController');

router.route('/').get(getJobs).post(addJob); // post this to db later, rn get info from url
router.route('/:encodedUrl').get(verifyUrl, parseJob);

module.exports = router;
