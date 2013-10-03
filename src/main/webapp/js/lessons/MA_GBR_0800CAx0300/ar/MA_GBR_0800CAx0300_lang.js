(function(lang){
	var ques1 = "";
	lang.topic = "الكسور";
	lang.tip = "التعرف على كسور الوحدة واستخدامها للعثور على الكسور العددية الأرقام";
	// *********************** TP Messages *************************
	lang.writtenScript1TP = "تعلم الكسور";
	lang.writtenScript2TP2_a = "هناك 8 من فراخ البط في البركة";
	lang.writtenScript2TP2_b = lang.writtenScript2TP2_a + "<br/>للعثور عليهم يجب<math><mfrac><mn>1</mn><mn>4</mn></mfrac></math> تقسيمها إلى 4 مجموعات متساوية";
	lang.writtenScript2TP2_c = lang.writtenScript2TP2_b + "<br/>هناك 2  من فراخ البط في كل مجموعة";
	lang.writtenScript2TP2_d = lang.writtenScript2TP2_c + "<br/>أذن من<math><mfrac><mn>1</mn><mn>4</mn></mfrac></math>8 ، 2"
	lang.writtenScript2TP2_e = lang.writtenScript2TP2_d + "<br/>انقر فوق السهم إلى الأمام للمتابعة";
	lang.writtenScript2TP3_a = "هناك 4 من الأوز في البركة";
	lang.writtenScript2TP3_b = lang.writtenScript2TP3_a + "<br/>للعثور عليهم يجب<math><mfrac><mn>1</mn><mn>2</mn></mfrac></math> تقسيمها إلى 4 مجموعات متساوية";
	lang.writtenScript2TP3_c = lang.writtenScript2TP3_b + "<br/>هناك  وزتين في كل مجموعة ";
	lang.writtenScript2TP3_d = lang.writtenScript2TP3_c + "<br/>أذن من<math><mfrac><mn>1</mn><mn>4</mn></mfrac></math>4 ، 2";
	lang.writtenScript2TP3_e = lang.writtenScript2TP3_d + "<br/>انقر  السهم إلى الأمام";
	lang.writtenScript2TP4_a = "هناك 6 تماسيح في البركة.";
	lang.writtenScript2TP4_b = lang.writtenScript2TP4_a + "<br/>للعثور عليهم يجب<math><mfrac><mn>1</mn><mn>3</mn></mfrac></math> تقسيمها إلى 4 مجموعات متساوية";
	lang.writtenScript2TP4_c = lang.writtenScript2TP4_b + "<br/>هناك تمساحين في كل مجموعة";
	lang.writtenScript2TP4_d = lang.writtenScript2TP4_c + "<br/>أذن من<math><mfrac><mn>1</mn><mn>4</mn></mfrac></math>6 ، 2";
	lang.writtenScript2TP4_e = lang.writtenScript2TP4_d + "<br/>انقرموافق لبدء التمرين";
	//___________________________________________________
	// ****************** DECLARING ARRAYS ***********************
	lang.questionNumerator = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	lang.questionDenominator = [5, 2, 4, 3, 6, 6, 3, 2, 3, 4];
	lang.questionTotal = [10, 8, 8, 9, 12, 6, 6, 10, 12, 12];
	lang.animal_Array = ["فراخ البط", "اللأوز", "التماسيح", "فراخ البط", "اللأوز", "التماسيح", "فراخ البط", "اللأوز", "التماسيح", "فراخ البط"];
	lang.animal_Array_temp = ["البطة الصغيرة", "وزه", "تمساح", "البطة الصغيرة", "وزه", "تمساح", "البطة الصغيرة", "وزه", "تمساح", "البطة الصغيرة"];
	// ****************** Excercise Messages ***********************
	lang.writtenScript1EX = function(qNum){
		ques1 = "ما هو <math><mfrac><mn>1</mn><mn>"+lang.questionDenominator[qNum]+"</mn></mfrac></math> من " + lang.questionTotal[qNum] + " " + lang.animal_Array[qNum] + "?";
		lang.writtenScript1EX_a = ques1 + "<br/>أكتب الإجابة ثم انقر موافق";
		return ques1;
	};
	lang.writtenScript1EX_a = ques1 + "<br/>أكتب الإجابة ثم انقر موافق";
	//___________________________________________________
	lang.answerText = function(qNum){
		return "<math><mfrac><mn>1</mn><mn>"+lang.questionDenominator[qNum] + "</mn></mfrac></math> من " + lang.questionTotal[qNum]+" "+lang.animal_Array[qNum]+" = ";
	}
	lang.celebrateText = function(x, y){
		var z = y / x;
		lang.writtenScript3EX1_a = "أحسنت";
		lang.writtenScript3EX2_b = lang.writtenScript3EX1_a + "<br/><math><mfrac><mn>1</mn><mn>"+x+"</mn></mfrac></math> من " + y + " هو " + z + "";
		lang.writtenScript3EX3_c = lang.writtenScript3EX2_b + "<br/><br/>انقر موافق للمتابعة";
		return lang.writtenScript3EX3_c;
	};
	//___________________________________________________
	lang.errorText = function(a, b, x, y){
		lang.writtenScript4EX1_a = "حاول مرة أخرى";
		lang.writtenScript4EX1_a1 = lang.writtenScript4EX1_a + "يوجد " + y + " " + a + " تماما/كلياً";
		lang.writtenScript4EX2_b = lang.writtenScript4EX1_a1 + "<br/>للعثور<math><mfrac><mn>1</mn><mn>"+x + "</mn></mfrac></math> of the على" + a + ", تقسيمها إلى " + b + " مجموعات متساوية.<br/> انقر واسحبهم في المربعات لمساعدتك";
		lang.writtenScript4EX3_c = lang.writtenScript4EX2_b + "<br/>ثم إحسب كم العدد " + a + "هناك في كل مربع.<br/> اكتب إجابتك في المربع.";
		//return writtenScript4EX3_c;
	};
	//----------------------------------------------
	lang.showAnswerText = function(x, y, a, answer){
		z = y / x;
		if (answer == 1){
			lang.writtenScriptP2a = "هنالك " + z + " " + a + " في كل مجموعة";
		}
		else{
			lang.writtenScriptP2a = "هنالك " + z + " " + a + " في كل مجموعة";
		}
		lang.writtenScriptP2b = lang.writtenScriptP2a + "<br/>هذا يعني أن <math><mfrac><mn>1</mn><mn>"+x + "</mn></mfrac></math> من " + y + " هو " + z + "";
		lang.writtenScriptP2c = lang.writtenScriptP2b + "<br/>انقر موافق للمتابعة";
		return lang.writtenScriptP2c;
	};

})(lang_ar_MA_GBR_0800CAx0300 = lang_ar_MA_GBR_0800CAx0300||{});
var lang_ar_MA_GBR_0800CAx0300;
