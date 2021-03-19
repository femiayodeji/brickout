import Ball from '/src/ball';
import Paddle from '/src/paddle';
import Heart from '/src/heart';
import InputHandler from '/src/input';
import { buildLevel, level1, level2} from '/src/levels'

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
}

export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameObjects = [];
        this.gameState = GAMESTATE.MENU;

        this.lives = 3;
        
        this.bricks = [];
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);

        this.levels = [level1, level2];
        this.currentLevel = 0;

        new InputHandler(this);        

        // this.start();
    }

    start(){
        if(
            this.gameState !== GAMESTATE.MENU && 
            this.gameState !== GAMESTATE.NEWLEVEL
        ) return;

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();

        this.gameObjects = [this.ball, this.paddle];

        this.gameState = GAMESTATE.RUNNING;
    }

    update(deltaTime){
        if(this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;

        if(this.gameState !== GAMESTATE.RUNNING) return;

        [...this.gameObjects, ...this.bricks].forEach((object) => {
            object.update(deltaTime)
        });

        this.bricks = this.bricks.filter(brick => !brick.destroy);

        if(this.bricks.length === 0){
            this.currentLevel++;
            this.gameState = GAMESTATE.NEWLEVEL;    
            this.start();
        }

    }

    draw(context){
        [...this.gameObjects, ...this.bricks].forEach((object) => {
            object.draw(context)
        });

        this.levelPanel(context);

        for(let i = 0; i < this.lives; i++){
            let heart = new Heart(this, {x: 770 - 20 * i, y: 10 })
            heart.draw(context);
        }

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

    victoryScreen(context){
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "rgba(0, 255, 0, 0.5)";
        context.fill();

        context.font = "30px Arial";
        context.fillStyle = "#ffffff";
        context.textAlign = "center";
        context.fillText(
            "LEVEL CLEARED", 
            this.gameWidth / 2, 
            this.gameHeight / 2
        );
    }

    levelPanel(context){
        context.font = "16px Arial";
        context.fillStyle = "rgb(0, 0, 255)";
        context.textAlign = "center";
        context.fillText(
            `Level ${this.currentLevel + 1}`, 
            32,
            28
        );
    }
}