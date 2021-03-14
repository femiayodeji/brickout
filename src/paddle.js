export default class Paddle{
    constructor(gameWidth, gameHeight){
        this.width = 150;
        this.height = 20;

        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight - this.height - 10
        };
    }

    draw(context){
        context.fillStyle = "#0f0";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime){
        if(!deltaTime) return;
    }
}
