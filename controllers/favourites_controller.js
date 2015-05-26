var models = require('../models/models.js');


exports.add= function(req,res) {
	var usuario=req.user;
	var quiz=req.quiz.id;

	usuario.hasQuiz(quiz).then(function(resultado) {
		
		if (resultado) {
			models.Favourites.find({where:{ UserId: Number(usuario.id), QuizId: Number(quiz) }}).then(
				function(entrada) {entrada.destroy().then(function(){}); });
		} else {	
			usuario.addQuiz(quiz);
		}
	});
	res.redirect("/quizes");

};

exports.index= function(req,res) {
	var usuario=req.user;
	var quizes=[];
	
	models.Favourites.findAll({ where:{UserId: Number(usuario.id)} }).then(function(entradas){
			for (i in entradas) {
				quizes.push(entradas[i].QuizId);
			}
			models.Quiz.findAll( {where:{ id: quizes} }).then(function(quizess){
				res.render('quizes/index.ejs',{quizes: quizess,errors: []});
			})	
		});

	

};