

function calculateAllOptions(board, scaleType, grade, completeScaleList){
	CompleteScaleArray = completeScaleList.split('\n');
	myScaleArray = [];
	for (let step = 0; step < (CompleteScaleArray.length -1) ; step++) {
		if ((CompleteScaleArray[step].search(board) != -1) && (CompleteScaleArray[step].search(grade) != -1)){
			if (scaleType == 'SCALES_PLUS'){
				let temp = CompleteScaleArray[step];
				let temp1 = temp.split(",").splice(3);
				myScaleArray.push(temp1.join(','));
			} else {
				if (CompleteScaleArray[step].search(scaleType) != -1){
					let temp = CompleteScaleArray[step];
					let temp1 = temp.split(",").splice(3);
					myScaleArray.push(temp1.join(', '));
				}
			}
		}
	}	
//	console.log(myScaleArray);
	return(myScaleArray);	
}

function selectRandomScale(){
	var myNewScaleArray = [];
//	console.log('myScaleArray ', myScaleArray);
	var maxstep = Math.floor(myScaleArray.length/2);
	if (myScaleTable.length < maxstep) { maxstep = myScaleTable.length;}
	for (let step1 = 0; step1 < myScaleArray.length; step1++) {		
		let oneScale = myScaleArray[step1];
//		console.log('oneScale=', oneScale);
		var found = false;
		step = 0;
		while ((found == false) && (step < maxstep)) {
//			console.log(myScaleTable[step], oneScale);
			found = myScaleTable[step].includes(oneScale);
//			console.log(step, myScaleTable[step]);
			step++;
		}
		if (found == false){
			myNewScaleArray.push(oneScale);
		}
	}
//	console.log('my NewScaleArray = ', myNewScaleArray);
	let myRandomScale = myNewScaleArray[Math.floor(Math.random() * myNewScaleArray.length)];
	console.log('myRandomScale =', myRandomScale);
//	add myRandomScale to Table as first element
	myScaleTable.unshift(todaysDate + ', '+ myRandomScale);
	if (myScaleTable.length > DisplayTableMax){
		myScaleTable.length = DisplayTableMax;
	}
	updateTableDisplay()
	updateLocalStorage();
	return;
}

function updateTableDisplay(){
//clear table and rewrite the contents of myScaleTable	
	let tableRef = document.getElementById("scaleTable");
	tableRef.innerHTML = "";
	//	document.getElementById("scaleTable").innerHTML = ""; //This works to empty table. 
	for (let step = 0; step < myScaleTable.length; step++) {
//		console.log(step/2, Math.floor(step/2));
//		if (step/2 === Math.floor(step/2)) {
//			console.log(step, "lightblue");
//			tableRef.style.color = "lightblue";
//		} else {
//			console.log(step, "purple");
//			tableRef.style.color = "#faf";
//		}	
		temp = myScaleTable[step];
		let newRow = tableRef.insertRow(step);	
		let cell1 = newRow.insertCell(0);
		cell1.innerHTML = temp.split(",")[0];
		let cell2 = newRow.insertCell(1);
		cell2.innerHTML = temp.split(",").splice(1);
		console.log("end of step", step);
	}
}

function updateLocalStorage(){
//Remove stored table items:
	for (let step = 0; step < DisplayTableMax; step++) {
		let tempstring = "ScaleTable" + step.toString().trim();
		if (localStorage.hasOwnProperty(tempstring) === true){
		currentBoard = localStorage.removeItem(tempstring);
		}
	}
//Store myScaleTable
	for (let step = 0; step < myScaleTable.length; step++) {
		let tempstring = "ScaleTable" + step.toString().trim();
		localStorage.setItem(tempstring, myScaleTable[step]);	
	}
}


function getTodaysDateString(){
	const today = new Date();
	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	const formattedToday = dd + '/' + mm + '/' + yyyy;
	return(formattedToday);
}

function initialiseParameters(){

// Check whether status was already stored, and if so, use stored value to overwrite:
// There is a risk some rubish was stored, and cannot be assigned to variable. 
	if (localStorage.hasOwnProperty('board') === true){
		currentBoard = localStorage.getItem("board");
		}
	document.getElementById("board").value = currentBoard;
	
	if (localStorage.hasOwnProperty('grade') === true){
		currentGrade = localStorage.getItem("grade")
		}	
	document.getElementById("grade").value = currentGrade;

	if (localStorage.hasOwnProperty('scaleType') === true){
		currentScaleType = localStorage.getItem("scaleType");	
	}	
	document.getElementById("scaletype").value = currentScaleType;
		
}		

function processChange(){
	currentBoard = document.getElementById("board").value 
	currentGrade = document.getElementById("grade").value
	currentScaleType = document.getElementById("scaletype").value
	writetoLocalStorage();
	myScaleArray = calculateAllOptions(currentBoard, currentScaleType, currentGrade, completeScaleList);
	console.log("myScaleArray after change", myScaleArray);
}

function SaveStatus(){
//Save User Choices to local Storage.
	let ExamBoard = document.getElementById("board").value.trim();
	let Grade = document.getElementById("grade").value.trim();
	let ScaleType = document.getElementById("scaletype").value.trim();
	localStorage.setItem("board", ExamBoard);
	localStorage.setItem("grade", Grade);
	localStorage.setItem("scaleType", ScaleType);
	writetoLocalStorage();
	downloadScaleTable();

}
function uploadScaleTable(){
// just upload stored values to myScaleTable, and call update display to get the display. 
//for (let step = (DisplayTableMax-1); step >= 0; step--) {
	for (let step = 0; step < DisplayTableMax; step++) {
		let tempstring = "ScaleTable" + step.toString().trim();
		if (localStorage.hasOwnProperty(tempstring) === true) {
			let temp = localStorage.getItem(tempstring);
//			myScaleTable.unshift(temp);
			myScaleTable.push(temp);
			}
	}
}


function writetoLocalStorage(){
	localStorage.setItem("board", currentBoard);
	localStorage.setItem("grade", currentGrade);
	localStorage.setItem("scaleType", currentScaleType);
//	downloadScaleTable();
}
function clearLocalStorage(){
	// the reset function.
	localStorage.removeItem("board"	);
	localStorage.removeItem("grade"	);
	localStorage.removeItem("scaleType"	);
	for (let step = 0; step < myScaleTable.length; step++) {
		let tempstring = "ScaleTable" + step.toString().trim();
		if (localStorage.hasOwnProperty(tempstring) === true){
			localStorage.removeItem(tempstring);
		}			
	}
//	And clear table
	let tableRef = document.getElementById("scaleTable");
	tableRef.innerHTML = "";
//  And reset the Table variable
	myScaleTable = [];	
}
window.onload = (event) => {
	initialiseParameters(currentBoard, currentGrade, currentScaleType);
	todaysDate = getTodaysDateString();
	myScaleArray = calculateAllOptions(currentBoard, currentScaleType, currentGrade, completeScaleList);
	uploadScaleTable();
	updateTableDisplay();
	console.log("page is fully loaded");
};


function windowClose() { 
	window.open('','_parent','');
	window.open('','_parent','');
	window.close();	
	} 

var myScaleArray = []; 	//array for all scales in file that can be considered. 
var myScaleTable = [];	// table to put date and the scales chosen at random
var todaysDate = "01/01/1990";
var currentBoard = 'TRINITY';
var currentGrade = 'GRADE0';
var currentScaleType = 'SCALES_ONLY';
var DisplayTableMax = 50;



