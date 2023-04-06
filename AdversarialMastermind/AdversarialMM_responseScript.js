// Function to respond to try & change the content of the table.
function processResponse() {
  let tryBoxValue = document.getElementById("try").value;
  tryBoxValue = tryBoxValue.trim().toUpperCase();
// if input if viable, process response, otherwise print not valid.
  if (tryBoxValue.length == lengthWord){
    document.getElementById("response").value = tryBoxValue + ' is valid';
// ideally it should do more checks at this point.	
// if result is valid, consider response by choosing returnstring
    let allResponsesToOptions = [];
	for (let step = 0; step < allOptions.length; step++){
		let tempstring = 	getResponse(tryBoxValue, allOptions[step]);   			
		allResponsesToOptions.push(tempstring);  
	}

// Count in allRespTOOptions the number of each element of Responses
	const map = allResponsesToOptions.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
	Responses = Array.from(map.keys());
	ResponseCount = Array.from(map.values());
//	console.log(map.entries())	
//	console.log('responses', Responses);
//	console.log('responseCount', ResponseCount);
// Responses are not in alphabetical order, they are in the order they were found. 'BBBB...' can be anywhere.
	if (Responses.length > 1) {
		//There are at least two possible answers.
		maxValue = Math.max(...ResponseCount);
		const indices = [];
		for (let step = 0; step < ResponseCount.length; step++){
			if (ResponseCount[step] == maxValue){ 
			//Check now if that one is 'BBB...'
				var countB = Responses[step].split('B').length -1;
				if (lengthWord != countB) {
				indices.push(step);
				}
			}
		}
		if (indices.length > 1) {//randomise  returnstring
		let randomIndex = Math.floor(Math.random() * indices.length);
		returnstring = Responses[indices[randomIndex]];
		} else {
		returnstring = Responses[indices[0]];
		}
//		console.log('number of most common responses', indices.length);
//		console.log('chosen returnstring', returnstring);
	} else {
		//There is only one answer, the answer must be 'BBBBB...', and the game ends.
		returnstring = Responses[0];
	}	
	// Put the chosen answer on table
	//Append line to table and put result.   
	const table = document.getElementById("resultsTable");
	const row = table.insertRow();
	const cell = row.insertCell();
	const cell1 = row.insertCell();
	const cell2 = row.insertCell();
	//Separate in two columns  
	cell.innerHTML = tryBoxValue;
	cell1.innerHTML = returnstring;
	//Now Check if 'BBBB...'
	var countB = returnstring.split('B').length -1;
	if (lengthWord == countB) {
//		el.removeEventListener("click", processResponse, false);
//		const table = document.getElementById("resultsTable");
//		const row = table.insertRow();
//		const cell = row.insertCell();
//	    const cell2 = row.insertCell();
		cell2.innerHTML = 'You win! Press reset to restart';	
	    } else{	
	// Prepare data for next cycle- reduce allOptions to the options that are still viable.
	//clear field for next guess.
	document.getElementById("try").value = ' ';
	document.getElementById("response").value = ' ';
	//reduce allOptions array.
    let viableOptions = [];
	for (let step = 0; step < allOptions.length; step++){
		if (allResponsesToOptions[step] == returnstring){ 
		viableOptions.push(allOptions[step]);
	}
	}
    allOptions = viableOptions;
	allResponsesToOptions = [];
	Responses =[];
	ResponseCount = [];
	if (allOptions.length > 10) {
    cell2.innerHTML = allOptions.length;
	}else {
	cell2.innerHTML = allOptions.length + ' ' + allOptions;			
	}
//  document.getElementById("dv").innerHTML = ""; //This works to empty table. 
		}
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
  return(returnValue);
};


// sort string characters in alphabetical order
function alphabet_Soup(str) { 
    return str.split("").sort().join("");       
};


// Add event listener on click to response box
//const el = document.getElementById("response");
//el.addEventListener("click", processResponse, false);
