// html elements
const btns = document.querySelectorAll(".btn");
let heading = document.querySelector("h1");
let level=1;
let compPattern = [];
let userPattern = [];
let colors= ["red","green","yellow","blue"];
let gameStarted = false;

const main = {
animation(obj,prop){
obj.classList.add(prop);
setTimeout(()=>{
obj.classList.remove(prop);
},100);
},

sound(obj){
let audio = new Audio("sounds\\" + obj.getAttribute('id') + ".mp3");
audio.currentTime = 0;
audio.play(); 
},

buttonFlash(){
	userPattern= [];
	let randomColor = colors[Math.floor(Math.random() * 4)];

    compPattern.push(randomColor);

    let randomBtn = document.querySelector("#" + randomColor);
    main.animation(randomBtn,"animate");
    main.sound(randomBtn); 
},

headingManager(change){
if(typeof change === "number")	
heading.innerHTML = "LEVEL " + change;
else
	heading.innerHTML = change;
},

buttonClicks(){
btns.forEach((btn)=>{
	btn.addEventListener("click",()=>{
        userPattern.push(btn.getAttribute("id"));
          
		main.animation(btn,"pressed");
		main.sound(btn);
		main.check();
	});
});
},

start(){
if(!gameStarted){
	gameStarted = true;
	main.buttonFlash();
	main.headingManager(level);
   
}},

check(){
if(compPattern[userPattern.length -1 ] === userPattern[userPattern.length -1]){
	if(userPattern.length === compPattern.length){
setTimeout(()=>{
main.buttonFlash();
level +=1;
main.headingManager(level);
},800);
	}
}
else{
	level = 1;
	main.headingManager("Game Over! Restart By pressing any key.");
	const background = document.querySelector("body");
	main.animation(background,"game-over");
	let audio = new Audio("sounds\\wrong.mp3");
    audio.currentTime= 0;
	audio.play();
main.restart();
}
},
restart(){
compPattern = [];
userPattern =[];
gameStarted = false;
}
};


// implementing
window.addEventListener("keydown",main.start);
main.buttonClicks();