export default class InputHandler{
    constructor(paddle) {
        document.addEventListener("keydown", (event) => {
            paddle.move(event.keyCode);
        });
        document.addEventListener("keyup", (event) => {
            paddle.stop(event.keyCode);
        });
    }
     
}