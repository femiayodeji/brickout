export default class Ball{
    constructor(){
        this.image = document.getElementById("img-ball");
    }

    draw(context){
        context.drawImage(this.image, 10, 10, 24, 24);
    }

    update(){
        // todo
    }
}