export default class InputHandler{
    constructor(paddle) {
        document.addEventListener("keydown", (event) => {
            switch(event.keyCode){
                case 37:
                    alert("left");
                    break;
                case 39:
                    alert("right");
                    break;                
            }
        });
    }
     
}