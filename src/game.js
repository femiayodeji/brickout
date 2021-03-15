import Paddle from '/src/paddle';
import InputHandler from '/src/input';
import Ball from '/src/ball';
import { buildLevel, level1} from '/src/levels'

export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start(){
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        let bricks = buildLevel(this, level1);

        this.gameObjects = [this.ball, this.paddle, ...bricks];

        new InputHandler(this.paddle);        
    }

    update(deltaTime){
        this.gameObjects.forEach((object) => {
            object.update(deltaTime)
        });

        this.gameObjects = this.gameObjects.filter(object => !object.destroy);

    }

    draw(context){
        this.gameObjects.forEach((object) => {
            object.draw(context)
        });
    }
}