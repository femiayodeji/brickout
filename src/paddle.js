export default class Paddle{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.width = 150;
        this.height = 20;

        this.maxSpeed = 7;
        this.speed = 0;

        this.position = {
            x: this.gameWidth / 2 - this.width / 2,
            y: this.gameHeight - this.height - 10
        };
    }

    draw(context){
        context.fillStyle = "#0f0";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime){
        this.position.x += this.speed;

         if(this.position.x < 0) 
            this.position.x = 0;

         if(this.position.x + this.width > this.gameWidth) 
            this.position.x = this.gameWidth - this.width;
    }

    move(keyCode){
        switch(keyCode){
            case 37:
                this.speed = -this.maxSpeed;
                break;
            case 39:
                this.speed = this.maxSpeed;
                break;                
        }

    }

    stop(keyCode){        
        switch(keyCode){
            case 37:
                if(this.speed < 0)
                    this.speed = 0;
                break;
            case 39:
                if(this.speed > 0)
                    this.speed = 0;
                break;                
        }        
    }
}
