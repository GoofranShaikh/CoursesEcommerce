const express = require('express');
const router = express.Router();
const adminController = require('../controller/AdminController');

router.post('/GetAdmin',adminController.getAdminDetails);
router.post('/postAdmin',adminController.AddAdmin);
router.post('/generate-qr',adminController.generateQr)

module.exports=router;
