
var numSymbols = document.getElementById("symbols").value;
var lengthWord = document.getElementById("length").value;;
var options3 = calculateAllOptions1(lengthWord, numSymbols);

var rightAnswer = options3[Math.floor(Math.random() * options3.length)];
document.getElementById("correctAnswer").value = rightAnswer;


function calculateAllOptions1(lengthWord, numSymbols){
	var options3;
	var WordArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var WordArray = WordArray.split("");
	var Array0 = WordArray.slice(0, numSymbols);
	var Array1 = Array0;
//	var Array1 = [];
	
	for (let step = 0; step < (lengthWord -1); step++){
//	for (let step = 0; step < lengthWord; step++){
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
