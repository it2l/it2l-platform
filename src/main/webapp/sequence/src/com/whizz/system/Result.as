class Result {
	private var description_txt:TexField;
	private var score_txt:TextField;
	private var percentage_txt:TextField;
	private var help1_txt:TextField;
	function Result() {
		
	}
	public function setDescription(description_txt:String):void {
		description_txt.text = description_txt;
	}
	public function setScore(score:Number):void {
		score_txt.text = score.toString();
	}
	public function setPercentage(percentage:Number):void {
		percentage_txt.text = percentage.toString();
	}
	public function setHelp1(help1:Number):void {
		help1_txt.text = help1.toString();
	}
}