function dragstart_handler(ev) {
 console.log("dragStart");
 // Change the source element's background color to signify drag has started
 ev.currentTarget.style.border = "dashed";
 // Add the id of the drag source element to the drag data payload so
 // it is available when the drop event is fired
 ev.dataTransfer.setData("text", ev.target.id);
 // Tell the browser only copy is possible, move not allowed
 ev.effectAllowed = "copy";
}		
function dragover_handler(ev) {
 console.log("dragOver");
 // Change the target element's border to signify a drag over event
 // has occurred
 ev.currentTarget.style.background = "lightblue";
 ev.preventDefault();
}
function dragleave_handler(ev) {
 console.log("dragLeave");
 // Change the target element's background back to original colour to signify a drag over event
 // has finished without drop
 ev.currentTarget.style.background = "gray";
 ev.preventDefault();
}
function drop_handler(ev) {
  console.log("Drop");
  ev.preventDefault();
  // Get the id of drag source element (that was added to the drag data
  // payload by the dragstart event handler)
  var id = ev.dataTransfer.getData("text");
  // Copy the element and change its name. 
  // New name is targetId + sourceID.
  // Both srcX and trgX are 4char each, in total newIDString will be 8 char, 
  //        the last is the letter.
  
  //Take only the first 4char as there mey have been a previous drop.
  let newIdString = ev.target.id.substring(0, 4) +id; 
  //Clone the node
  var nodeCopy = document.getElementById(id).cloneNode(true);
  //change the name to newIDstring
  nodeCopy.id = newIdString;
  nodeCopy.style.border = "solid black";
  //CLEAN UP BEFORE DROP, as there may have been something there already!
  if (ev.target.id.length > 4 ) {
  //	 Go to parent node, and replace child. 
	 ev.target.parentNode.replaceChildren(nodeCopy);
  } else {
  // Otherwise, it is the first drop.
	 ev.target.appendChild(nodeCopy);
  }
    console.log(newIdString);

}
function dragend_handler(ev) {
  console.log("dragEnd");
  // Restore source's border
  ev.target.style.border = "solid black";
  // Remove all of the drag data
  ev.dataTransfer.clearData();
}
function processGo(){
//Get the last letter of each ID, which is the source dropped in.
let userAns = '';
//code below checks if each element has children.
let myElement = document.getElementById('tgt1');
if ( myElement.childElementCount !== 0 ){
userAns = userAns + myElement.children[0].id.substring(myElement.children[0].id.length -1)}
myElement = document.getElementById('tgt2');
if ( myElement.childElementCount !== 0 ){
userAns = userAns + myElement.children[0].id.substring(myElement.children[0].id.length -1)}
myElement = document.getElementById('tgt3');
if ( myElement.childElementCount !== 0 ){
userAns = userAns + myElement.children[0].id.substring(myElement.children[0].id.length -1)}
myElement = document.getElementById('tgt4');
if ( myElement.childElementCount !== 0 ){
userAns = userAns + myElement.children[0].id.substring(myElement.children[0].id.length -1)}
console.log(userAns);
if (userAns.length == 4){
	document.getElementById("response").value = userAns + ' is valid';
	return userAns; }
	else {
	document.getElementById("response").value = userAns + ' is not valid';		
;	
}
}	

