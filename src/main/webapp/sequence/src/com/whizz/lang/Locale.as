import com.whizz.utils.StringUtil;
import com.whizz.lang.Translate;
/**
 * ...
 * @author Scott Humphrey
 */

class com.whizz.lang.Locale 
{
	private static var instance:Locale;
	private static var allow_instantation:Boolean;
	private var flaName:String;
	static private var defaultLang:String = System.capabilities.language;
	static private var xmlLang:String = defaultLang;
	private var xmlMap:Object = new Object();
	private var xmlDoc:XML;
	private var stringMap:Object = new Object();
	private var delayedInstanceArray:Array = new Array();
	private var currentXMLMapIndex:Number = -1;
	private var callback:Function;

	// new in Flash 8
	private var autoReplacment:Boolean = true;			// should we assign text automatically after loading xml?
	static private var currentLang:String;						// the current language of stringMap
	private var stringMapList:Object = new Object();		// the list of stringMap objects, used for caching
	private var currentPath:String;
	private var loadedXML:Array = new Array();
	function Locale() {
		if (!allow_instantation) {
			trace("ERROR - use getInstance()");
		}
	}
	
	static function getInstance():Locale {
		if (instance == null) {
			allow_instantation = true;
			instance = new Locale();
			allow_instantation = false;
		}
		return instance;
	}
	/******************************************
	* Accessors
	******************************************/
	// return the status of whether we should replace the strings automatically after loading the xml
	function get autoReplace():Boolean {
		return autoReplacment;
	}

	// set the status of whether we should replace the strings automatically after loading the xml
	// set to false by Flash if the text replacement method is "via ActionScript at runtime"
	function set autoReplace(auto:Boolean):Void {
		autoReplacment = auto;
	}

	// return an array of language codes
	function get languageCodeArray():Array {
		var langCodeArray:Array = new Array;
		for(var i:String in xmlMap) {
			if(i != undefined) {
				langCodeArray.push(i);
			}
		}

		return langCodeArray;
	}

	// return an array of string IDs
	function get stringIDArray():Array {
		var strIDArray:Array = new Array;
		for(var i:String in stringMap) {
			if(i != "") {
				strIDArray.push(i);
			}
		}

		return strIDArray;
	}

	/******************************************
	 * public methods
	 ******************************************/

	function setFlaName(name:String):Void {
		flaName = name;
	}

	// Return the default language code.
	static function getDefaultLang():String {
		return defaultLang;
	}

	// Set the default language code.
	static function setDefaultLang(langCode:String):Void {
		defaultLang = langCode;
	}

	// Add the {languageCode and languagePath} pair into the internal array for later use.
	// This is primarily used by  Flash when the strings replacement method is "automatically at runtime"
	// or "via ActionScript at runtime". 
	function addXMLPath(langCode:String, path:String):Void {
		if(xmlMap == undefined) {
			xmlMap[langCode] = new Array();
		}
		currentPath = path;
		for (var x:Number = 0; x < xmlMap[langCode].length; x++) {
			if (xmlMap[langCode][x] == path)
				return;
		}
		xmlMap[langCode].push(path);
	}


	// Add the {instance, string ID} pair into the internal array for later use.
	// This is primarily used by Flash when the strings replacement method is "automatically at runtime". 
	function addDelayedInstance(instance:Object, stringID:String) {
		delayedInstanceArray.push({inst : instance, strID : stringID});
		var len:Number = delayedInstanceArray.length;
	}

	// Return true if the xml is loaded, false otherwise. 
	function checkXMLStatus():Boolean {
		var stat:Boolean = xmlDoc.loaded && xmlDoc.status == 0;
		return stat;
	}

	// Set the callback function that will be called after the xml file is loaded.
	function setLoadCallback(loadCallback:Function) {
		callback = loadCallback;
	}

	// Return the string value associated with the given string id in the current language.
	function loadString(id:String):String {
		//return "";
		return Translate.text(stringMap[id]);
	}

	// Return the string value associated with the given string id and language code.
	// To avoid unexpected xml loading, this call will not load the language xml if it has not been loaded.
	// You should decide on the right time to call loadLanguageXML manually if you want to load a language xml.
	public function loadStringEx(stringID:String, languageCode:String):String {
		var tmpMap:Object = stringMapList[languageCode];
		if (tmpMap != undefined) {
			return tmpMap[stringID];
		} else {
			return "";
		}
	}

	// Set the new string value of a given string ID and language code.
	public function setString(stringID:String, languageCode:String, stringValue:String):Void {
		var tmpMap:Object = stringMapList[languageCode];
		if (tmpMap != undefined) {
			tmpMap[stringID] = stringValue;
		} else {
			// the map doesn't exist, possibly haven't loaded the language xml file yet, but we store the string anyway
			tmpMap = new Object();
			tmpMap[stringID] = stringValue;
			stringMapList[languageCode] = tmpMap;
		}
	}

	// Determine the language to use and begin xml loading.
	// This is primarily used by Flash when the strings replacement method is "automatically at runtime".
	function initialize():Void {
		xmlDoc = new XML();
		xmlDoc.ignoreWhite = true;
		xmlDoc.onLoad = function(success:Boolean) {
			onXMLLoad(success); // parse the XML
			callback.call(null, success);
		}
		
		var langCode:String = xmlLang;
		if(xmlMap[xmlLang] == undefined) {
			langCode = defaultLang;
		}

		currentXMLMapIndex = 0;
		xmlDoc.load(xmlMap[langCode][0]);
	}

	// Load the specified language xml file.
	function loadLanguageXML(xmlLanguageCode:String, customXmlCompleteCallback:Function):Void {
		// if xmlLang is not defined, set to SystemCapabilities.language
		var langCode:String = (xmlLanguageCode == "") ? System.capabilities.language : xmlLanguageCode;
		if(xmlMap[langCode] == undefined) {
			// if the specified language is not defined, set to default language
			langCode = defaultLang;
		}

		if (customXmlCompleteCallback) {
			callback = customXmlCompleteCallback;
		}
		trace("loadLangueXML: " + hasXMLBeenLoaded(currentPath));
		if (!hasXMLBeenLoaded(currentPath)) {
			// if the xml has not been loaded before, load it			
			var class_root:Locale = this;
			xmlDoc = new XML();
			xmlDoc.ignoreWhite = true;
			xmlDoc.onLoad = function(success:Boolean) {
				class_root.addLoadedXML(class_root.currentPath);
				class_root.onXMLLoad(success); // parse the XML
				class_root.callback(success);
			}
			trace("loadLanguageXML: " + currentPath);
			xmlDoc.load(currentPath);
		} else {
			// the xml is already loaded, retrieve it from the list
			stringMap = stringMapList[langCode];

			// call the callback here because onLoad is not called here
			trace("loadLangueXML callback: " + callback);
			if (callback)
				callback(true);
		}
		currentLang = langCode;
	}
	public function translateTopicName(original_name:String):String {
		switch(original_name) {
			case "AA":
			case "Place Value":
				return loadString("IDS_PLACE_VALUE");
			break;
			case "BA":
			case "Properties of Numbers":
				return loadString("IDS_PROPERTIES_OF_NUMBERS");
			break;
			case "CA":
			case "Fractions":
				return loadString("IDS_FRACTIONS");
			break;
			case "DA":
			case "Decimals":
				return loadString("IDS_DECIMALS");
			break;
			case "FA":
			case "Mental Calculations: + and -":
				return loadString("IDS_MENTAL_CALCS_PLUS_AND_MINUS");
			break;
			case "Mental Calculations: x and /":
				return loadString("IDS_MENTAL_CALCS_MULTI_AND_DIVISION");
			break;
			case "GA":
			case "Pencil and Paper - addition":
				return loadString("IDS_PENCIL_PAPER_ADDITION");
			break;
			case "HA":
			case "Pencil and Paper - subtraction":
				return loadString("IDS_PENCIL_PAPER_SUBTRACTION");
			break;
			case "LA":
			case "Pencil and Paper - multiplication":
				return loadString("IDS_PENCIL_PAPER_MULTI");
			break;
			case "MA":
			case "Pencil and Paper - division":
				return loadString("IDS_PENCIL_PAPER_DIVISION");
			break;
			case "EA":
			case "Rapid Recall: + and -":
				return loadString("IDS_RAPID_RECALL_PLUS_AND_MINUS");
			break;
			case "JA":
			case "Rapid Recall: x and /":
				return loadString("IDS_RAPID_RECALL_MULTI_AND_DIVISION");
			break;
			case "NA":
			case "Solving Problems":
				return loadString("IDS_SOLVING_PROBLEMS");
			break;
			case "PA":
			case "Handling Data":
				return loadString("IDS_HANDLING_DATA");
			break;
			case "QA":
			case "Measures":
				return loadString("IDS_MEASURES");
			break;
			case "RA":
			case "Shape and Space":
				return loadString("IDS_SHAPE_SPACE");
			break;
			case "SA":
			case "Percentages and Ratio":
				return loadString("IDS_PERCENTAGES_RATIO");
			break;
			case "TA":
			case "Using Calculators":
				return loadString("IDS_USING_CALCULATORS");
			break;
			case "UA":
			case "Integers, Powers and Roots":
				return loadString("IDS_INTEGERS_POWERS_ROOTS");
			break;
			case "VA":
			case "Equations, Formulae and Identities":
				return loadString("IDS_EQUATIONS_FORMULAE_IDENTITIES");
			break;
			case "WA":
			case "Sequences, Functions and Graphs":
				return loadString("IDS_SEQUENCE_FUNCTIONS_GRAPHS");
			break;
			case "ZA":
			case "Probability":
				return loadString("IDS_PROBABILITY");
			break;
			
		}
	}
	/******************************************
	 * private methods
	 ******************************************/
	
	private function onXMLLoad(success:Boolean) {
		if(success == true) {
			// reset the string map
			//delete stringMap;
			//stringMap = new Object();

			parseStringsXML(xmlDoc);

			// store the string map in the list for caching
			/*
			if (stringMapList[currentLang] == undefined) {
				stringMapList[currentLang] = stringMap;
			}
			*/
			stringMapList[currentLang] = stringMap;
			if (autoReplacment) {
				assignDelayedInstances();
			}
		}
	}

	private function parseStringsXML(doc:XML):Void {
		if(doc.childNodes.length > 0 && doc.childNodes[0].nodeName == "xliff") {
			parseXLiff(doc.childNodes[0]);
		}
	}

	private function parseXLiff(node:XMLNode):Void {
		if(node.childNodes.length > 0 && node.childNodes[0].nodeName == "file") {
			parseFile(node.childNodes[0]);
		}
	}

	private function parseFile(node:XMLNode):Void {
		if(node.childNodes.length > 1 && node.childNodes[1].nodeName == "body") {
			parseBody(node.childNodes[1]);
		}
	}

	private function parseBody(node:XMLNode):Void {
		for(var i:Number = 0; i < node.childNodes.length; i++) {
			if(node.childNodes[i].nodeName == "trans-unit") {
				parseTransUnit(node.childNodes[i]);
			}
		}
	}

	private function parseTransUnit(node:XMLNode):Void {
		var id:String = node.attributes.resname;
		trace("node:"+node);
		if(id.length > 0 && node.childNodes.length > 0 &&
				node.childNodes[0].nodeName == "source") {
			var value:String = parseSource(node.childNodes[0]);
			if (value.length > 0) {
				value = StringUtil.replace(value,"\\n", "\n");
				stringMap[id] = value;
			}
		}
	}

	// return the string value of the source node
	private function parseSource(node:XMLNode):String {
		if(node.childNodes.length > 0) {
			return node.childNodes[0].nodeValue;
		}

		return "";
	}

	private function assignDelayedInstances():Void {
		for(var i:Number = 0; i < delayedInstanceArray.length; i++) {
			if(delayedInstanceArray[i] != undefined) {
				var instance:Object = delayedInstanceArray[i].inst;
				var stringID:String = delayedInstanceArray[i].strID;
				instance.text = loadString(stringID);
				trace(instance);
			}
		}
	}
	private function addLoadedXML(path:String):Void {
		loadedXML.push(path);
	}
	private function hasXMLBeenLoaded(path:String):Boolean {
		for (var x = 0; x < loadedXML.length; x++) {
			if (loadedXML[x] == path)
				return true;
		}
		return false;
	}
}