var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

// Página de entrada (home page)
router.get('/', sessionController.logoutTime, function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', sessionController.logoutTime,  quizController.load);  // autoload :quizId
router.param('commentId', sessionController.logoutTime, commentController.load);  // autoload :commentId

// Definición de rutas de sesion
router.get('/login', sessionController.logoutTime, sessionController.new);     // formulario login
router.post('/login', sessionController.logoutTime, sessionController.create);  // crear sesión
router.get('/logout', sessionController.logoutTime, sessionController.destroy); // destruir sesión
// Definición de rutas de /quizes
router.get('/quizes',                      sessionController.logoutTime, quizController.index);
router.get('/quizes/:quizId(\\d+)',        sessionController.logoutTime, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.logoutTime, quizController.answer);
router.get('/author', sessionController.logoutTime, quizController.autores);
router.get('/search', sessionController.logoutTime, quizController.index);
router.get('/quizes/new', 				   sessionController.logoutTime, sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.logoutTime, sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.logoutTime, sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.logoutTime, sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.logoutTime, sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new',           sessionController.logoutTime,  commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',              sessionController.logoutTime, commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', 
	                                    sessionController.logoutTime, sessionController.loginRequired, commentController.publish);


module.exports = router;
