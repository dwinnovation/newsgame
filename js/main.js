// hardcoded answer definitions
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

/*
 * an answer option has been selected - put value in the article text and close popover
 */
function optionSelected(questionId, value) {
	console.log("value " + value + " selected for " + questionId);
	var $span = $('#'+questionId);
	
	$span.text(value);
	$span.addClass("answered");
	
	popovers[questionId].popover("hide");
}

/*
 * build the HTML fragment for a question
 */ 
function buildQuestionContent(questionId) {
	var answer = answers[questionId];

	if (typeof answer === 'undefined') {
		return "no question definition!";
	}

	var $ul = $("<ul>");

	if (answer.questionType == "text") {
		$.each(answer.answerOptions, function(i, opt) {
		    
		    var id = questionId + "_" + i;
		    var $input = $('<input class="answerOption" type="radio">').attr("value", opt.text).attr("id", id).attr("name", questionId);

		    var $label = $('<label>').attr("for", id).text(opt.text);

			var $li = $("<li>").append($input).append($label);
			
			if (opt.correct) {
				$li.addClass("correct");
			}

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

var popovers = {};

function enableQuizQuestion($span) {
	
	var spanId = $span.attr('id');
	var content = buildQuestionContent(spanId);

	// remove text:
	$span.text("");
	
	popovers[spanId] = $span.popover(
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

		// click handler for all answer options on the articleBody:
		// (using jQuery delegated event handler mechanism because options are added dynamically)
		$("#articleBody").on("click", ".answerOption", function(){				
			optionSelected(
				$(this).attr("name"),
				$(this).val()
			);
		});
		
	}
	
);