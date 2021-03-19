import { detectCollision } from '/src/collisionDetection'

export default class Heart{
    constructor(game, position){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        this.image = document.getElementById("img-heart");
        this.size = 24;

        this.position = position;
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
    }
}