export default class Ball{
    constructor(gameWidth, gameHeight){
        this.gameScale = { gameWidth, gameHeight };

        this.image = document.getElementById("img-ball");

        this.position = { x: 10, y: 10 };
        this.speed = { x: 4, y: 2 };

        this.size = 24;
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

        if(this.position.x + this.size > this.gameScale.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }

        if(this.position.y + this.size > this.gameScale.gameHeight || this.position.y < 0){
            this.speed.y = -this.speed.y;
        }
    }
}