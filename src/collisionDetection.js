export function detectCollision(ball, gameObject){
    let ballTop  = ball.position.y;
    let ballBottom  = ball.position.y + ball.size;

    let objectTop = gameObject.position.y;
    let objectBottom = gameObject.position.y + gameObject.height;
    let objectLeft = gameObject.position.x;
    let objectRight = gameObject.position.x + gameObject.width;

    if(
        ballTop <= objectBottom && 
        ballBottom >= objectTop && 
        ball.position.x >= objectLeft && 
        ball.position.x + ball.size <= objectRight
    ){
        return true;
    } 
    else {
        return false;
    }
}