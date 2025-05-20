var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var gameStarted = false;

$(document).keydown(function(){

    if(gameStarted === false){
        gameStarted = true;
        $("h1").text("Level 1");

       setTimeout(nextSequence, 400);

    }
})

function nextSequence() {

    if(gamePattern.length > 0){
    for(let i = 0; i < gamePattern.length; i++){
        setTimeout(function (){
            playSound(gamePattern[i]);
            $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
        }, 700 * i);
    }
}

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    level = level + 1;
    $("h1").text("Level " + level);

    setTimeout(function(){
        playSound(randomChosenColor);
        $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    }, 700 * (gamePattern.length - 1)); // Diminuo por -1 pq a nova cor foi adicionada com o gamePattern.push(randomChosenColor)
    
}

function playSound(name){

    switch(name){
        case "green": 
            var greenSound = new Audio("./sounds/green.mp3");
            greenSound.play();
            break;
        case "red": 
            var redSound = new Audio("./sounds/red.mp3");
            redSound.play();
            break;
        case "yellow": 
            var yellowSound = new Audio("./sounds/yellow.mp3");
            yellowSound.play();
            break;
        case "blue": 
            var blueSound = new Audio("./sounds/blue.mp3");
            blueSound.play();
            break;
        default:
            break;
    }

}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").on("click", function(){

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
 
});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(currentLevel + 1 === gamePattern.length){
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }

    }else{

        $("h1").text("Game Over, Press Any Key to Restart...");
        var gameOverSound = new Audio("./sounds/wrong.mp3");
        gameOverSound.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();

    }
}

function startOver(){

    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStarted = false;

}