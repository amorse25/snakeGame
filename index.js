'use strict';

var gameStart = false;


const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

var startButtonX = 350;
var startButtonY = 350;
var startButtonW = 140;
var startButtonH = 50;

ctx.fillStyle = "white";
ctx.fillRect(startButtonX, startButtonY, startButtonW, startButtonH);

ctx.fillStyle = "red";
ctx.font = "30px Arial";
ctx.fillText("BEGIN", 375, 385);




var clickFunction = function(event) {
    event.preventDefault();
        if (
          event.x > startButtonX && 
          event.x < startButtonX + startButtonW &&
          event.y > startButtonY && 
          event.y < startButtonY + startButtonH
        ) {
          // Executes if button was clicked
          canvas.removeEventListener('click', clickFunction, false);
          setup();
        }
}
canvas.addEventListener('click', clickFunction, false);


const scl = 20;     // spacing scalar variable
const rows = cvs.height / (scl);
const col = cvs.width / (scl);

var snake;
var food;
var perks;

var perkNotAte = true;      // perk is not ate
var snakeHasAbility = false;// player has perk activated
var collide = false;        // player collides snake to self or walls
var counter = 0;            // holds if perk is spawned on board game
var playerScore = 0;        // player score


function setup() {
    snake = new Snake();
    food = new Food();
    perks = new Perks();
    food.spawnFood();
    perks.spawnPerks();
    var startGame = setInterval(() => {
        // snake
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // score
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("SCORE: ", 10, 30);
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText(playerScore, 130, 30);

        snake.draw();
        food.draw();
        if (perkNotAte) {       // perk was not ate
            perks.draw();       // draw
        }
        snake.update();
        
        // spawn food and check if player ate food to update score
        if (snake.eatFood(food)) {
            food.spawnFood();
            playerScore++;
            //prevent multiple perks from spawning (only one max at a time)
            if (perks.isPerk() === true) {
                perks.spawnPerks();
            }
        }
        // activate ability
        if (snake.eatPerks(perks)) {
            if (perkGeneration <= wallPerk) {
                perks.wallAbility();     // player eats wall perk   

            } else {
                perks.scoreAbility();
            } 
        }
        // player has ability, activate wall immunity
        if(snakeHasAbility) {
            snake.wallhack(canvas.width, canvas.height);        // ability activated
        }
        
        // player does not have ability, detect for wall collision
        if (snakeHasAbility === false) {           
            snake.collision(canvas.width, canvas.height)
        }
        //when a collision happens (wall or self)
        if (collide) {      
            snake.endGame();
            clearInterval(startGame);
            canvas.addEventListener('click', clickFunction, false);
        }
    }, 100);
};

// movement of snake
window.addEventListener('keydown', ((evt) => {
    const direction = evt.keyCode;
    snake.move(direction);
}));

