var express=require("express");

var loginController=require("../src/login/loginController");
var whoLoggedController = require("../src/whoLogged/whoLoggedController");



const router=express.Router();

router.route('/login/login').post(loginController.loginLoginControllerFn);
router.route('/login/create').post(loginController.createLoginControllerFn);
router.route('/login/users').get( loginController.getAllUserDataControllerFn)
router.delete('/login/users/:id', loginController.deleteUserByIdControllerFn);
router.get('/login/email/:username', loginController.getEmailByUsernameControllerFn);

router.get('/whoLogged/fetch', whoLoggedController.getWhoLoggedFn);
router.delete('/whoLogged/del', whoLoggedController.delWhoLoggedFn);
router.post('/whoLogged/create', whoLoggedController.whoLoggedcreateLoginControllerFn);


module.exports = router;