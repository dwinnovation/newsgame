var answers = {
	quizquestion_1 : {
		questionType : "textWithImage",
		answersOptions : [
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
			var $li = $("<li>").text(opt.text);
			if (opt.correct)
			{
				$li.addClass("correct");
			}
			
			$ul.append($li);
		});
	} else if (answer.questionType == "textWithImage") {
		$.each(answer.answerOptions, function(i, opt) {
			var $li = $("<li>").text(opt.text);
			if (opt.correct)
			{
				$li.addClass("correct");
			}
			
			$ul.append($li);
		});
	} else {
	}
	
	var content = $("<div>").append($ul).html();
	
	return content;
}

function enableQuizQuestion($span) {
	
	var spanId = $span.attr('id');
	var content = buildQuestionContent(spanId);

	// remove text:
	$span.text("");
	
	console.log(content);
	
	$span.popover(
	{
		"html": true,
		"placement": "auto",
		"trigger": "click",
		"content": content
	}
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
	}
);