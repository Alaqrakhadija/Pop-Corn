const router = require("express").Router();
const bodyParser = require("body-parser");
const authController = require('../controllers/auth.controller');
const http = require('http');

// const bodyParser = require("body-parser"); //get request -data from user

router.get('/signup', authController.getSignup);
router.post(
    "/signup",
    bodyParser.urlencoded({ //middle ware to get user's data
        extended: true
    }),
    authController.postSignup
);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
// router.all('/logout',authController.logout);
// router.get('/home', function(request, response) {
// 	// If the user is loggedin
// 	if (request.session.loggedin) {
// 		// Output username
// 		response.send('Welcome back, ' + request.session.name + '!');
// 	} else {
// 		// Not logged in
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });
router.get('/login/save', authController.saveSession);
router.get('/PopCorn', authController.home);
router.post('/edit', authController.editProfile);
router.post('/ques', authController.questions);
router.post('/Sendques', authController.sendQuestions)
router.get('/Profile', authController.profile);
router.get("/Home", authController.youMightlike);


module.exports = router;