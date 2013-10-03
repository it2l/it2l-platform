class com.whizz.system.SystemQuestionCounter {
	private var number_of_questions:Number = 0;
	private var question_number:Number = 0;
	function SystemQuestionCounter() {
		
	}
	public function setTotalQuestion(number_of_questions:Number):Void {
		this.number_of_questions = number_of_questions;
	}
	public function incQuestion():Void {
		++question_number;
	}
	public function get total():Number {
		return number_of_questions;
	}
	public function get question():Number {
		return question_number;
	}
}