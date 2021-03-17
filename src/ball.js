import { detectCollision } from '/src/collisionDetection'

export default class Ball{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.image = document.getElementById("img-ball");

        this.reset();

        this.size = 24;
    }

    reset(){
        this.position = { x: 10, y: 400 };
        this.speed = { x: 4, y: -2 };
    }

    draw(context){
        context.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.size, 
            this.size
        );
    }

    update(deltaTime){        
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if(this.position.x + this.size > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }

        if(this.position.y < 0){
            this.speed.y = -this.speed.y;
        }

        if(this.position.y + this.size > this.gameHeight){
            this.game.lives--;
            this.reset();
        }

        let ballBottom  = this.position.y + this.size;
        let paddleTop = this.game.paddle.position.y;
        let paddleLeft = this.game.paddle.position.x;
        let paddleRight = this.game.paddle.position.x + this.game.paddle.width;

        if(detectCollision(this, this.game.paddle)){
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}