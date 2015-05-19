var models = require('../models/models.js');



exports.estadisticas = function(req, res) {
	
	models.Quiz.findAll().then(function(quiz){
		models.Comment.findAll({where:{ publicado: true}}).then(function(comment){
			var comentados = [];
			var nocomentados = quiz.length;
			var x = quiz.length;
            var y = comment.length;
            var nmedcom = y/x;
            for (var i=0; i < comment.length; i++) {
            	if(comentados[comment[i].QuizId] === undefined){
            		nocomentados--;

            	}
            	comentados[comment[i].QuizId]=1;
            };
            var z = x - nocomentados;

			res.render('quizes/statics', {npreg: x, ncom: y,nmedcom: nmedcom, nsincom: nocomentados ,nconcom: z , errors: []});
		
		})
	})


};