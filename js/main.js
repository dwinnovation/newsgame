$(document).ready(
	function() {
		// find and "enable" all quiz questions:
		$('[id^="quizquestion_"]').each(
			function(i, $element) {
				alert($element.attr("id"));
			}
		);
	}
);