'use strict';

function Snake() {
    this.x = 400;
    this.y = 400;
    this.xSpeed = scl * 1;
    this.ySpeed = 0;
    this.score = 0;
    this.bonus = false;
    this.tail = [];
    

    this.draw = function() {
        if (snakeHasAbility) {
            ctx.fillStyle = "yellow";
        } else{
            ctx.fillStyle = "red";
        }
        
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        ctx.fillRect(this.x, this.y, scl, scl);
    }
    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.score - 1] = {x: this.x, y: this.y};
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
    this.move = function(direction) {
        switch (direction) {
            case 37: 
                this.xSpeed = -scl * 1;
                this.ySpeed = 0;
                break;
            case 38: 
                this.xSpeed = 0;
                this.ySpeed = -scl * 1;
                break;
            case 39: 
                this.xSpeed = scl * 1;
                this.ySpeed = 0;
                break;
            case 40: 
                this.xSpeed = 0;
                this.ySpeed = scl * 1;
                break;
        }
        
    }
    this.endGame = function() {
        this.x = 400;
        this.y = 400;
        this.xSpeed = scl * 1;
        this.ySpeed = 0;
        this.score = 0;
        this.tail = [];

        playerScore = 0;
        counter = 0;
        collide = false;
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 328, 450);
        ctx.fillStyle = "white";
        ctx.fillRect(startButtonX, startButtonY, startButtonW, startButtonH);
        
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("RETRY", 372, 385);
    }

    this.collision = function(width, height) {
        // check if snake collides with walls
        if (this.x > width - 10 || this.x < 0 ||
            this.y > height - 10 || this.y < 0) {
            collide = true;
            return true;
        }
        // check if snake collides with self
        for (let i = 0; i < this.tail.length - 1; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                collide = true;
                return true;
            }
        }
        return false;
    }
    this.eatFood = function(food) {
        if (this.x === food.x && this.y === food.y) {
            this.score++;
            return true;
        }
        return false;
    }
    this.eatPerks = function(perks) {
        if (this.x === perks.x && this.y === perks.y) {
            this.bonus = true;
            return true;
        }
        return false;
    }

    this.wallhack = function(width, height) {

        // allow player to hit wall and enter (portal) through other side
        if (this.x > width - 10) {
            this.x = 0
        }
        if (this.x < 0) {
            this.x = width; 
        }
        if (this.y > height - 10) {
            this.y = 0
        }
        if (this.y < 0) {
            this.y = height; 
        }

    }


}





