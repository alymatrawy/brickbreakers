//forward declarations
const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20
const gridWidth = 560
const gridHeight = 300
const scoreDisplay = document.querySelector('#score')
let timerId
const ballDiameter = 20
let xDirection =2
let yDirection =2
let score =0

//user position variables
const userStartPosition = [230,10]
const userCurrentPosition = userStartPosition

//ball position variables
const ballStartPosition= [270,40]
let ballCurrentPosition = ballStartPosition


//===================================(blocks)================================

//create block object
class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft= [xAxis,yAxis]
        this.bottomRight= [xAxis+blockWidth, yAxis]
        this.topLeft = [xAxis,yAxis+blockHeight]
        this.topRight = [xAxis+blockWidth, yAxis + blockHeight]
    }
}


//na array of all the blocks and their locations
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

//draw my blocks to the screen
function addBlocks(){

    for (let i=0; i<blocks.length;  i++){
        const block = document.createElement('div')
         block.classList.add('block')
         block.style.left= blocks[i].bottomLeft[0] + 'px'
         block.style.bottom = blocks[i].bottomLeft[1] + 'px'
         grid.appendChild(block)
    }
}


addBlocks()




//===================================(user)================================


//add user to the screen
const user = document.createElement('div')
user.classList.add('user')
updateUserPosition()
grid.appendChild(user)


//update user position on the screen
function updateUserPosition(){
    user.style.left = userCurrentPosition[0] + 'px'
    user.style.bottom = userCurrentPosition[1] + 'px'
}


//move user using keys
function moveUser(e){
    switch(e.key){

        //if user hits left arrow move the user 10 pixels to the left
        case 'ArrowLeft':
            if(userCurrentPosition[0]>0){ // making sure user stays on the grid
            userCurrentPosition[0] -=10
            updateUserPosition()
            }
            break;

          //if user hits right arrow move the user 10 pixels to the right
        case 'ArrowRight':
            if(userCurrentPosition[0]<gridWidth-blockWidth){ // making sure user stays on the grid
            userCurrentPosition[0] +=10
            updateUserPosition()
            }
            break;
    }

}

//getting key inputs from user
document.addEventListener('keydown',moveUser)



//===================================(ball)================================

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
updateBallPosition()
grid.appendChild(ball)


//draw ball with new position on the screen
function updateBallPosition(){
    ball.style.left = ballCurrentPosition[0] +'px'
    ball.style.bottom = ballCurrentPosition[1] +'px'
}

//moving the ball
function moveBall(){

    ballCurrentPosition[0]+= xDirection
    ballCurrentPosition[1]+= yDirection
    updateBallPosition()
    checkForWallCollision()
}



timerId = setInterval(moveBall,30)



//check the position of the ball to see if direction change is needed

function checkForWallCollision(){



    //check for block collisions

    for (let i=0; i< blocks.length; i++){

        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0]) &&
            (ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ( (ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1])&&
            (ballCurrentPosition[1] < blocks[i].topLeft[1])
        ){
            //we know our ball has hit a block
            const allBlocks = Array.from(document.querySelectorAll('.block'))

            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeBallDirection()
            score++
            scoreDisplay.innerHTML= score

            //check if user has won

            if(blocks.length===0){
                scoreDisplay.innerHTML = 'YOU WIN <br> Final Score: ' + score
                clearInterval(timerId)
                document.removeEventListener('keydown',moveUser)
            }


        }
    }



    //check for wall collision
    if (ballCurrentPosition[0]>=(gridWidth-ballDiameter) || ballCurrentPosition[1]>=(gridHeight-ballDiameter) || (ballCurrentPosition[0]<=0)){
            changeBallDirection()
    }

    //check if ball hits the paddle

    if(
        (ballCurrentPosition[0] > userCurrentPosition[0]) &&
        (ballCurrentPosition[0] < (userCurrentPosition[0] + blockWidth))&&
        (ballCurrentPosition[1] > userCurrentPosition[1]) &&
        (ballCurrentPosition[1] < (userCurrentPosition[1] + blockHeight))
        ){
            changeBallDirection()
        }


    //check if ball hit the floor for game over
    if(ballCurrentPosition[1]<=0){
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'YOU LOSE <br> Final Score: ' + score
        document.removeEventListener('keydown',moveUser)
    }

}


//change the direction of the ball
function changeBallDirection(){


    //right wall
    if(xDirection===2 && yDirection===2){
        yDirection =-2
        return
    }

    if(xDirection===2 && yDirection===-2){
        xDirection =-2
        return
    }


    if(xDirection===-2 && yDirection===-2){
        yDirection =2
        return
    }



    if(xDirection===-2 && yDirection===2){

        xDirection=2

        return
    }





}