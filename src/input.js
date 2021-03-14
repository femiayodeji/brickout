export default class InputHandler{
    constructor(paddle) {
        document.addEventListener("keydown", (event) => {
            paddle.move(event.keyCode);
        });
    }
     
}