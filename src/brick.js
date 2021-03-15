export default class Brick{
    constructor(game, position){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.image = document.getElementById("img-brick");

        this.position = position;

        this.width = 60;
        this.height = 32;
    }

    draw(context){
        context.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
    }

    update(deltaTime){        
    }
}