const express = require('express');
const router = express.Router();
const managerController = require('../middleware/controllers/ManagerController');

//Multer for upload file
const multer = require('multer');
const upload = multer({dest: './public/img/staff_imgs/'})


router.get('/', managerController.show);
router.get('/dashboard', managerController.dashboard);
router.get('/staff-management', managerController.showStaff)
      .post('/staff-management',upload.single('staff_img'), managerController.saveStaffInfo);
router.get('/staff-management/:id', managerController.showEditPage)
      .put('/staff-management/:id',upload.single('staff_img'), managerController.updateStaffInfo)
      .delete('/staff-management/:id', managerController.deleteStaffInfo)

module.exports = router;