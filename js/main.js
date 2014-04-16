// hardcoded answer definitions
var answers = {
	quizquestion_1 : {
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
	},
	quizquestion_2 : {
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
	,
	quizquestion_3 : {
		questionType : "textWithImage",
		answerOptions : [
			{
				text : "Frank-Walter Steinmeier",
			  	correct: true
			},
			{
				text : "Hillary Clinton"
			},
			{
				text : "David Cameron"
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

		    var $input = $('<input class="answerOption" type="radio"> ').attr("value", opt.text).attr("id", id).attr("name", questionId);
		    var $label = $('<label>').attr("for", id).text(opt.text);

			var $li = $("<li>").append($input).append($label);
			
			if (opt.correct) {
				$li.addClass("correct");
			}

			$ul.append($li);
		});
	} else if (answer.questionType == "textWithImage") {
		$.each(answer.answerOptions, function(i, opt) {
		    var id = questionId + "_" + i;

		    var $input = $('<input class="answerOption" type="radio">').attr("value", opt.text).attr("id", id).attr("name", questionId);
		    var $label = $('<label>').attr("for", id).text(opt.text);

			// TODO: add image

			var $li = $("<li>").append($input).append($label);
			
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

// mapping of question id to popovers, useful when we want to close them
var popovers = {};

/*
 * "enable" a question span by removing the inner text and adding the popover triggered by click
 */
function enableQuizQuestion(span) {
	var $span = $(span);
	var questionId = $span.attr('id');
	var content = buildQuestionContent(questionId);

	// remove text:
	$span.text("");
	
	popovers[questionId] = $span.popover(
		{
			"html": true,
			"placement": "auto",
			"trigger": "click",
			"content": content
		}
	);
}

/**
 * check if all quiz questions have been answered
 */
function checkQuizAnswers() {
	var total = 0,
		answered = 0,
		correct = 0;
		
	$('#articleBody [id^="quizquestion_"]').each(
		function(i, el) {
			$el = $(el);
			if (true)             total++;
			if ($el.hasClass("answered")) answered++;
		}
	);
	
	if (answered < total) {
		// not all question have been answered
		$('#missingAnswersModalDialog').modal();
	} else if (correct < total) {
		// some answers are wrong
		$('#summaryModalDialog').modal();
	} else {
		// all answers correct - perfect!
		$('#ssummaryModaklDialog').modal();
	}
}

$(document).ready(
	function() {
		// find and "enable" all quiz questions:
		$('#articleBody [id^="quizquestion_"]').each(
			function(i, element) {
				enableQuizQuestion(element);
			}
		);
		
		// click handler for "check" button:
		$('#quizcheckbutton').click(checkQuizAnswers);

		// global click handler for all answer options on the articleBody:
		// (using jQuery delegated event handler mechanism because options are added dynamically)
		$("#articleBody").on("click", ".answerOption", function(){				
			optionSelected(
				$(this).attr("name"),
				$(this).val()
			);
		});
		
	}
	
);
