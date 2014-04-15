function enableQuizQuestion($span) {
	$span.popover(
	{
		html: true,
		placement: "auto",
		trigger: "click",
		title: "Frage",
		content: "content",
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