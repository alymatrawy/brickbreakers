const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20


//create block
class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft= [xAxis,yAxis]
        this.bottomRight= [xAxis+blockWidth, yAxis]
        this.topLeft = [xAxis,yAxis+blockHeight]
        this.topRight = [xAxis+blockWidth, yAxis + blockHeight]
    }
}



//draw my block
function addBlock(){
    const block = document.createElement('div')
    block.classList.add('block')
    grid.appendChild(block)
}


addBlock()