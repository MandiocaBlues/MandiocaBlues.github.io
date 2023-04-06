

function calculateAllOptions(lengthWord, numSymbols){

	var WordArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var WordArray = WordArray.split("");
	var Array0 = WordArray.slice(0, numSymbols);
	var Array1 = Array0;
    var tempstring1 = ' ';
	
	for (let step = 0; step < (lengthWord -1); step++){
	var tempArray = [];
		for (let step0 = 0; step0 < numSymbols; step0++){
			let tempstring = Array0[step0];
			for (let step1 = 0; step1 < Array1.length; step1++) {
			tempstring1 = tempstring + Array1[step1];
			tempArray.push(tempstring1);
			}
		}
		Array1 = tempArray;
	}
	
return(Array1);	
}

function processReset(){
//clear table
	document.getElementById("resultsTable").innerHTML = ""; //This works to empty table. 
//clear try and response boxes
	document.getElementById("try").value = "";
	document.getElementById("response").value = "";
//get new values for number of symbols and length
	numSymbols = document.getElementById("symbols").value;
	lengthWord = document.getElementById("length").value;;
//recalculate  correct answer no longer necessary
	allOptions = calculateAllOptions(lengthWord, numSymbols);
	var allResponsesToOptions =[];
	var ResponseCount =[];		
}


var numSymbols = document.getElementById("symbols").value;
var lengthWord = document.getElementById("length").value;;
var allOptions = calculateAllOptions(lengthWord, numSymbols);
var allResponsesToOptions =[];
var ResponseCount =[];
processReset();

