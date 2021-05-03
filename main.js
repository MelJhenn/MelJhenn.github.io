var secretNumber= random ();
var tries=0;
function play (){
	tries=tries+1;
    var description=document.getElementById("description");
    var text=document.getElementById("text");
	var guessNumber=text.value;
    text.value="";
    guessNumber=parseInt(guessNumber);
    if (secretNumber==guessNumber){
    	description.innerHTML="Bien Hecho! Lo lograste en "+tries+" intentos. Pense en otro número, juega de nuevo.";
        secretNumber=random();
        tries=0;
    }
    else {
    	if (guessNumber<secretNumber){
        	description.innerHTML=("Mas Arriba");
           
        }
        else {
        	description.innerHTML=("Mas Abajo");
        }
    }
}
function random (){
	
    return Math.floor(Math.random() * 10)+1;
}