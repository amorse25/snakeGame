'use strict';

function Food() {
    this.x;
    this.y;


    this.spawnFood = function() {
        // x and y position of food randomly chosen
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * (scl);    
        this.y = (Math.floor(Math.random() * col - 1) + 1) * (scl);
    }

    this.draw = function() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, scl, scl);
    }
}