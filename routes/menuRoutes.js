const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/rolesCheck')
const menuController = require('../controller/menuController');
 router.post('/GetMenus',menuController.GetAllMenus)
router.post('/AddMenus',roleCheck.checkAdminRole,auth.AuthenticateRequest,menuController.AddMenus); //check Admin ROLE before accesing the route for adding menus
module.exports=router;