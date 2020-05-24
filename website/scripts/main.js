//Randomize color of the letters onclick button//
function randomizeS() {
  	document.getElementById('S-2').style.fill = randomColors();
}

function randomizeT() {
  	document.getElementById('T-2').style.fill = randomColors();
}

function randomizeO() {
  	document.getElementById('O-2').style.stroke = randomColors();
}
			
function randomColors() {
  	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

//Change letter Z-index onclick letter//
var svg = document.querySelector("svg");
var letters = document.querySelectorAll("path, circle");

var i = letters.length;
while(i--) {
  	letters[i].addEventListener("click", function(e) {
   		svg.appendChild(e.target);
  	});
}

//Invert colors on keydown spacebar//
var invert = document.querySelector('body');

window.addEventListener("keydown", toggle);

function toggle(event) {
    if(event.keyCode === 32) {
        invert.classList.toggle('click');
    }
 }