export default class InputHandler{
    constructor(game) {
        document.addEventListener("keydown", (event) => {
            game.paddle.move(event.keyCode);
            switch(event.keyCode){
                case 27:
                    game.togglePause();
                    break;
            }
    
        });
        document.addEventListener("keyup", (event) => {
            game.paddle.stop(event.keyCode);
        });
    }
     
}