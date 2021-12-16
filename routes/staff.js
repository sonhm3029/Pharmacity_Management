const express = require('express');
const router = express.Router();
const staffController = require('../middleware/controllers/StaffController');


const upload = require('../middleware/multer');

router.get('/', staffController.show);

router.get('/make-import-report', staffController.show_import_report_page)
      .post('/make-import-report', upload.array('report_file'), staffController.save_import_report);

router.get('/my-report',staffController.show_my_report_page);
router.get('/my-report/:report_link', staffController.show_report_detail);
module.exports = router;