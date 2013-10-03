(function(lang){
	var ques1 = "";
	lang.topic = "Fractions";
	lang.tip = "Recognise unit fractions and use them to find fractions of numbers.";
	// *********************** TP Messages *************************
	lang.writtenScript1TP = "Learning about fractions.";
	lang.writtenScript2TP2_a = "There are 8 ducklings in the pond.";
	lang.writtenScript2TP2_b = lang.writtenScript2TP2_a + "<br/>To find <math><mfrac><mn>1</mn><mn>4</mn></mfrac></math> of them, split them into 4 equal groups.";
	lang.writtenScript2TP2_c = lang.writtenScript2TP2_b + "<br/>There are 2 ducklings in each group.";
	lang.writtenScript2TP2_d = lang.writtenScript2TP2_c + "<br/>So <math><mfrac><mn>1</mn><mn>4</mn></mfrac></math> of 8 is 2";
	lang.writtenScript2TP2_e = lang.writtenScript2TP2_d + "<br/>Click the forward arrow to continue.";
	lang.writtenScript2TP3_a = "There are 4 cygnets in the pond.";
	lang.writtenScript2TP3_b = lang.writtenScript2TP3_a + "<br/>To find <math><mfrac><mn>1</mn><mn>2</mn></mfrac></math> of them, split them into 2 equal groups.";
	lang.writtenScript2TP3_c = lang.writtenScript2TP3_b + "<br/>There are 2 cygnets in each group.";
	lang.writtenScript2TP3_d = lang.writtenScript2TP3_c + "<br/>So <math><mfrac><mn>1</mn><mn>2</mn></mfrac></math> of 4 is 2";
	lang.writtenScript2TP3_e = lang.writtenScript2TP3_d + "<br/>Click the forward arrow.";
	lang.writtenScript2TP4_a = "There are 6 crocodiles in the pond.";
	lang.writtenScript2TP4_b = lang.writtenScript2TP4_a + "<br/>To find <math><mfrac><mn>1</mn><mn>3</mn></mfrac></math> of them, split them into 3 equal groups.";
	lang.writtenScript2TP4_c = lang.writtenScript2TP4_b + "<br/>There are 2 crocodiles in each group.";
	lang.writtenScript2TP4_d = lang.writtenScript2TP4_c + "<br/>So <math><mfrac><mn>1</mn><mn>3</mn></mfrac></math> of 6 is 2";
	lang.writtenScript2TP4_e = lang.writtenScript2TP4_d + "<br/>Click OK to start the exercise.";
	//___________________________________________________
	// ****************** DECLARING ARRAYS ***********************
	lang.questionNumerator = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	lang.questionDenominator = [5, 2, 4, 3, 6, 6, 3, 2, 3, 4];
	lang.questionTotal = [10, 8, 8, 9, 12, 6, 6, 10, 12, 12];
	lang.animal_Array = ["ducklings", "cygnets", "crocodiles", "ducklings", "cygnets", "crocodiles", "ducklings", "cygnets", "crocodiles", "ducklings"];
	lang.animal_Array_temp = ["duckling", "cygnet", "crocodile", "duckling", "cygnet", "crocodile", "duckling", "cygnet", "crocodile", "duckling"];
	// ****************** Excercise Messages ***********************
	lang.writtenScript1EX = function(qNum){
		ques1 = "What is <math><mfrac><mn>1</mn><mn>"+lang.questionDenominator[qNum]+"</mn></mfrac></math> of " + lang.questionTotal[qNum] + " " + lang.animal_Array[qNum] + "?";
		lang.writtenScript1EX_a = ques1 + "<br/>Write your answer and click OK.";
		return ques1;
	};
	lang.writtenScript1EX_a = ques1 + "<br/>Write your answer and click OK.";
	//___________________________________________________
	lang.answerText = function(qNum){
		return "<math><mfrac><mn>1</mn><mn>"+lang.questionDenominator[qNum] + "</mn></mfrac></math> of " + lang.questionTotal[qNum]+" "+lang.animal_Array[qNum]+" = ";
	}
	lang.celebrateText = function(x, y){
		var z = y / x;
		lang.writtenScript3EX1_a = "Great work!";
		lang.writtenScript3EX2_b = lang.writtenScript3EX1_a + "<br/><math><mfrac><mn>1</mn><mn>"+x+"</mn></mfrac></math> of " + y + " is " + z + "";
		lang.writtenScript3EX3_c = lang.writtenScript3EX2_b + "<br/><br/>Click OK to continue.";
		return lang.writtenScript3EX3_c;
	};
	//___________________________________________________
	lang.errorText = function(a, b, x, y){
		lang.writtenScript4EX1_a = "Try again.";
		lang.writtenScript4EX1_a1 = lang.writtenScript4EX1_a + " There are " + y + " " + a + " altogether.";
		lang.writtenScript4EX2_b = lang.writtenScript4EX1_a1 + "<br/>To find <math><mfrac><mn>1</mn><mn>"+x + "</mn></mfrac></math> of the " + a + ", split them into " + b + " equal groups.<br/>Click and drag them into the boxes to help you.";
		lang.writtenScript4EX3_c = lang.writtenScript4EX2_b + "<br/>Then count how many " + a + " there are in each box.<br/>Write your answer in the box.";
		//return writtenScript4EX3_c;
	};
	//----------------------------------------------
	lang.showAnswerText = function(x, y, a, answer){
		z = y / x;
		if (answer == 1){
			lang.writtenScriptP2a = "There is " + z + " " + a + " in each group.";
		}
		else{
			lang.writtenScriptP2a = "There are " + z + " " + a + " in each group.";
		}
		lang.writtenScriptP2b = lang.writtenScriptP2a + "<br/>This means that <math><mfrac><mn>1</mn><mn>"+x + "</mn></mfrac></math> of " + y + " is " + z + "";
		lang.writtenScriptP2c = lang.writtenScriptP2b + "<br/>Click OK to continue.";
		return lang.writtenScriptP2c;
	};

})(lang_en_MA_GBR_0800CAx0300 = lang_en_MA_GBR_0800CAx0300||{});
var lang_en_MA_GBR_0800CAx0300;
