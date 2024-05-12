const express = require('express');
const router = express.Router();
const coursesController = require('../controller/CoursesController')
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/rolesCheck')

router.get('/AddCourses',auth.AuthenticateRequest,roleCheck.checkAdminRole,coursesController?.AddCourses);
router.post('/GetAllCourses',auth.AuthenticateRequest , coursesController.GetAllCourses)
router.post('/create-order',coursesController.CreateOrder)
module.exports =router;