const express = require('express');
const router = express.Router();
const coursesController = require('../controller/CoursesController')
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/rolesCheck')

router.get('/AddCourses',auth.AuthenticateRequest,roleCheck.checkAdminRole,coursesController?.AddCourses);
router.get('/GetAllCourses',auth.AuthenticateRequest , coursesController.GetAllCourses)
module.exports =router;