var answers = {
	quizquestion_1 : {
		questionType : "textWithImage",
		answerOptions : [
			{
				text : "Sowjetunion",
			  	image : "http:/www.bla.de/dkjbvjhdb",
			  	correct: true
			},
			{
				text : "DDR",
			 	image : "http:/www.bla.de/dkjbvjhdb"
			},
			{
				text : "Aserbaidschan",
			 	image : "http:/www.bla.de/dkjbvjhdb"
			}
		]
	},
	quizquestion_2 : {
		questionType : "text",
		answerOptions : [
			{
			 	text : "Ursula von der Leyen",
			  	correct: true
			},
			{
				text : "Angela Merkel"
			},
			{
				text : "Hillary Clinton"
			}
		]
	}
};

function buildQuestionContent(questionId) {
	var answer = answers[questionId];

	if (typeof answer === 'undefined') {
		return "no question definition!";
	}

	var $ul = $("<ul>");

	if (answer.questionType == "text") {
		$.each(answer.answerOptions, function(i, opt) {
		    
		    var id = questionId + "_" + i;
		    
		    var $input = $('<input type="radio">').attr("value", opt.text).attr("id", id).attr("name", questionId);
		    var $label = $('<label>').attr("for", id).text(opt.text);
			var $li = $("<li>").append($input).append($label);
			
			if (opt.correct) {
				$li.addClass("correct");
			}
			
			console.log($li.html());
			
			$ul.append($li);
		});
	} else if (answer.questionType == "textWithImage") {
		$.each(answer.answerOptions, function(i, opt) {
			var $li = $("<li>").text(opt.text);
			if (opt.correct) {
				$li.addClass("correct");
			}
			
			$ul.append($li);
		});
	} else {
		console.log("undefined question type");
	}
	
	var content = $("<div>").append($ul).html();
	
	return content;
}

var popovers = [];

function enableQuizQuestion($span) {
	
	var spanId = $span.attr('id');
	var content = buildQuestionContent(spanId);

	// remove text:
	$span.text("");
	
	popovers.push(
		$span.popover(
			{
				"html": true,
				"placement": "auto",
				"trigger": "click",
				"content": content
			}
		)
	);
}

$(document).ready(
	function() {
		// find and "enable" all quiz questions:
		$('[id^="quizquestion_"]').each(
			function(i, element) {
				var $span = $(element);
				enableQuizQuestion($span);
			}
		);
		
		// global onclick handler:
		//$("body").click(function(){
		//	// close all popovers:
		//	$.each(popovers, function(i,popover){
		//		popover.popover("hide");
		//	})
		//});
	}
	
);