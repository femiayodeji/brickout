import Paddle from '/src/paddle';
import InputHandler from '/src/input';
import Ball from '/src/ball';
import { buildLevel, level1} from '/src/levels'

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameObjects = [];
        this.gameState = GAMESTATE.MENU;

        this.lives = 1;
        
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        new InputHandler(this);        
    }

    start(){
        if(this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;

        if(this.gameState != GAMESTATE.MENU) return;

        let bricks = buildLevel(this, level1);

        this.gameObjects = [this.ball, this.paddle, ...bricks];

        this.gameState = GAMESTATE.RUNNING;
    }

    update(deltaTime){
        if(this.gameState != GAMESTATE.RUNNING) return;

        this.gameObjects.forEach((object) => {
            object.update(deltaTime)
        });

        this.gameObjects = this.gameObjects.filter(object => !object.destroy);

    }

    draw(context){
        this.gameObjects.forEach((object) => {
            object.draw(context)
        });

        if(this.gameState == GAMESTATE.PAUSED){
            this.pausedScreen(context);
        }
        else if(this.gameState == GAMESTATE.MENU){
            this.menuScreen(context);
        }
        else if(this.gameState == GAMESTATE.GAMEOVER){
            this.gameOverScreen(context);
        }
    }

    togglePause(){
        if(this.gameState == GAMESTATE.PAUSED){
            this.gameState = GAMESTATE.RUNNING;
        }
        else{
            this.gameState = GAMESTATE.PAUSED;
        }
    }

    pausedScreen(context){
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fill();

        context.font = "30px Arial";
        context.fillStyle = "#ffffff";
        context.textAlign = "center";
        context.fillText(
            "Paused", 
            this.gameWidth / 2, 
            this.gameHeight / 2
        );
    }

    menuScreen(context){
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "rgba(0, 0, 0, 1)";
        context.fill();

        context.font = "30px Arial";
        context.fillStyle = "#ffffff";
        context.textAlign = "center";
        context.fillText(
            "Press SPACE BAR to Start", 
            this.gameWidth / 2, 
            this.gameHeight / 2
        );
    }

    gameOverScreen(context){
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.fill();

        context.font = "30px Arial";
        context.fillStyle = "#ffffff";
        context.textAlign = "center";
        context.fillText(
            "GAME OVER", 
            this.gameWidth / 2, 
            this.gameHeight / 2
        );
    }
}