class com.whizz.system.SystemScore {
	private var score:Number = 0;
	private var percentage:Number = 0;
	private var help1:Number = 0;
	private var help2:Number = 0;
	private var help3:Number = 0;
	private var time:Number = 0;
	function SystemScore() {
	}
	public function setScore(number_of_questions:Number, score_for_question:Number):Void {
		if (score_for_question != null) {
			score += score_for_question;
		} else {
			++score;
		}
		percentage = (100/number_of_questions)*score;
	}
	public function getScore():Number {
		return score;
	}
	public function getPercentage():Number {
		return percentage;
	}
	public function setHelp(help_level:Number):Void {
		switch (help_level) {
		case 2 :
			++help2;
			break;
		case 3 :
			++help3;
			break;
		default :
			++help1;
			break;
		}
	}
	public function getHelp(help_level:Number):Number {
		switch (help_level) {
		case 2 :
			return help2;
			break;
		case 3 :
			return help3;
			break;
		default :
			return help1;
			break;
		}
	}
}
