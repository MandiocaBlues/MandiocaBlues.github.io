// Function to change the content of the table.
function processResponse() {
  const responseBoxValue = document.getElementById("response").value.toUpperCase();
  let tryBoxValue = document.getElementById("try").value;
  tryBoxValue = tryBoxValue.trim().toUpperCase();
  if (tryBoxValue.length == lengthWord ){
    document.getElementById("response").value = tryBoxValue + ' is valid';  
  
//clear field for next guess.
  document.getElementById("try").value = ' ';

//Append line to table and put result.   
  const table = document.getElementById("resultsTable");
  const row = table.insertRow();
  const cell = row.insertCell();
  const cell1 = row.insertCell();
  var returnstring = getResponse(tryBoxValue, rightAnswer);
//Separate in two columns  
  cell.innerHTML = tryBoxValue;
  cell1.innerHTML = returnstring;
  if ((returnstring.split('!').length - 1) !=0){
	const row = table.insertRow();
    const cell = row.insertCell();
    cell.innerHTML = 'You win!';	
  };

//  document.getElementById("dv").innerHTML = ""; //This works to empty table. 
  } else {
    document.getElementById("response").value = tryBoxValue + ' is not valid';
  };
};

function getResponse(mytry, chosenvalue){ //generic function to check mytry against chosen value, for any length.
  returnValue = '';
  let mytryAmended = '';
  let chosenvalueAmended = '';
  for (let step = 0; step < chosenvalue.length; step++) {
    if (mytry[step]===chosenvalue[step]){
      returnValue= returnValue +'B';
   } else {
	   mytryAmended = mytryAmended + mytry[step];
	   chosenvalueAmended = chosenvalueAmended + chosenvalue[step];
   };
  };
  chosenvalueAmended = alphabet_Soup(chosenvalueAmended);
//stop here. number of BB should be right, and the strings mytryAmended and chosenvalueAmended should be shorter if a match was removed.
  for (let step = 0; step < chosenvalueAmended.length; step++) {
    var ch = chosenvalueAmended[step];
	var count = chosenvalueAmended.split(ch).length - 1;
	var countintry = mytryAmended.split(ch).length - 1;
	whites = Math.min(count, countintry);
	
	for(let index = 0; index < whites; index++){
		returnValue = returnValue +'w';
		};
	if (count > 1) {
	step = step+count-1;
	}
	};
	if (returnValue.length > chosenvalue.length) {
		returnValue = returnValue + ' Error!';
	};
	var countB = returnValue.split('B').length - 1;
	if (chosenvalue.length === countB) {
			returnValue = returnValue + '!';
			//stop once we got right result
			el.removeEventListener("click", processResponse, false);
	};
  return(returnValue);
};


// sort string characters in alphabetical order
function alphabet_Soup(str) { 
    return str.split("").sort().join("");       
};

// Add event listener on click to response box
const el = document.getElementById("response");
el.addEventListener("click", processResponse, false);

function processReset(){
//clear table
 document.getElementById("resultsTable").innerHTML = ""; //This works to empty table. 
//id="dv"
//clear try and response boxes
  document.getElementById("try").value = "";
  document.getElementById("response").value = "";
//get new values for number of symbols and length
numSymbols = document.getElementById("symbols").value;
lengthWord = document.getElementById("length").value;;

//recalculate correctAnswer
  options3 = calculateAllOptions1(lengthWord, numSymbols);
  rightAnswer = options3[Math.floor(Math.random() * options3.length)];

//  var rightAnswer = "ACB"; //for testing
//put the stuff in the right box
  document.getElementById("correctAnswer").value = rightAnswer
  //routine have access to common variable rightAnswer                                                       s
  document.getElementById("message").value = rightAnswer +' '+numSymbols+' '+lengthWord; 
//reinstate eventListener for el	
  const el = document.getElementById("response");
  el.addEventListener("click", processResponse, false);
}
