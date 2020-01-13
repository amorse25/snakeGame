'use strict';

const randNumb = 0.40;      // perk probability
var wallPerk = 0.50;
var scorePerk = 1.00;
var perkGeneration = 0;

// wallhack perk (snake can touch walls without dying for 10 seconds)
// bonus score perk (player will recieve 10+ points to score)
// extra food perk (more pieces of food will spawn for 10 - 20 seconds)

function Perks() {
    this.x;
    this.y;

    this.spawnPerks = function() {
        perkGeneration = Math.random();     // generate randum number for perk possibility percentage
        perkNotAte = true;
        if (perkGeneration > randNumb) {
            this.x = (Math.floor(Math.random() * rows - 1) + 1) * (scl);
            this.y = (Math.floor(Math.random() * col - 1) + 1) * (scl);
            counter++;
        }
    }
    this.draw = function() {
        if (perkGeneration <= wallPerk) {
            ctx.fillStyle = "yellow";
        } else {
            ctx.fillStyle = "green";
        } 
        ctx.fillRect(this.x, this.y, scl, scl);
    }
    this.isPerk = function() {
        if (counter === 0) {
            return true;    // perk is availble to be spawned
        } else {
            return false;   // do not spawn since there is already one out there
        }
    }
    this.wallAbility = function() {
        var timeLeft = 10;
        perkNotAte = false;       // perk was ate
        ctx.clearRect(this.x, this.y, scl, scl);    // clear after eaten
        snakeHasAbility = true;     // snake now activates ability
        var perkLife = setInterval(function(){
            /*ctx.fillStyle = "yellow";
            ctx.font = "30px Arial";
            ctx.fillText(timeLeft, 600, 30);*/
            timeLeft -= 1;
            if(timeLeft <= 0) {
                snakeHasAbility = false;
                counter--;
                clearInterval(perkLife);
            }
        }, 1000);
    }
    this.scoreAbility = function() {
        perkNotAte = false;
        playerScore += 10;
        counter--;
    }
}