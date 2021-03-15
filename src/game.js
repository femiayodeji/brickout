import Paddle from '/src/paddle';
import InputHandler from '/src/input';
import Ball from '/src/ball';
import Brick from '/src/brick'

export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start(){
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        let bricks = [];
        
        for(let i = 0; i < 14; i++){
            bricks.push(new Brick(this, { x: 56 * i , y: 32}))
        }

        this.gameObjects = [this.ball, this.paddle, ...bricks];

        new InputHandler(this.paddle);        
    }

    update(deltaTime){
        this.gameObjects.forEach((object) => {
            object.update(deltaTime)
        });
    }

    draw(context){
        this.gameObjects.forEach((object) => {
            object.draw(context)
        });
    }
}