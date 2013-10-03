class com.whizz.system.Results {
	private var results_container:Array;
	function Results() {
		results_container = [];
	}
	public function addResult(exercise_result:Result):void {
		results_container.push(exercise_result);
	}
}