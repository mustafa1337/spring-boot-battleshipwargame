// Getting Variables with querySelector using document
const player1FlipButton=document.querySelector('#player1-flip-button')
const player2FlipButton=document.querySelector('#player2-flip-button')
const startButton=document.querySelector('#start-button')
const startButton2=document.querySelector('#start-button2')
const player1OptionContainer=document.querySelector('.player1-option-container')
const player2OptionContainer=document.querySelector('.player2-option-container')
const gamesBoardContainer=document.querySelector('#gamesboard-container');
const turnDisplay=document.querySelector('#turn-display')
const infoDisplay=document.querySelector('#info')
const player1MissedInfo=document.querySelector('#player2-missed')
const player2MissedInfo=document.querySelector('#player1-missed')
const player1HitsInfo=document.querySelector('#player2-hits')
const player2HitsInfo=document.querySelector('#player1-hits')
const fadeoutClass1='fadeout1'
const fadeoutClass2='fadeout2'
let turn='player1'


let counter=1
//const checkButton=document.querySelector("#checkButton")
//checkButton.addEventListener("click",checkClick)
// this is function to restart the game by refreshing the page and records in the backend
function refresh(){
    var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:8080/refresh", true); 
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
             // Response
             console.log('response')
             var response = this.responseText;
           }
        };
        
        
        xhttp.send();
}

// variable to store angles on flip
let anglePlayer1=0
let anglePlayer2=0;
// method to flip player1 ships
function flipPlayer1(){
    console.log("Flip Function start")
    anglePlayer1 = anglePlayer1===0 ? 90 :0
   const optionShips=Array.from(player1OptionContainer.children)
   optionShips.forEach(optionShip=>optionShip.style.transform=`rotate(${anglePlayer1}deg)`)
   console.log("Flip Function end")

}
//method to flip player2 ships
function flipPlayer2(){
    console.log("Flip Function start")
    anglePlayer2 = anglePlayer2===0 ? 90 :0
   const optionShips=Array.from(player2OptionContainer.children)
   optionShips.forEach(optionShip=>optionShip.style.transform=`rotate(${anglePlayer2}deg)`)
   console.log("Flip Function end")

}
function start(){
    console.log('start button clicked');
}
//adding listners flip functions to flip buttons
player1FlipButton.addEventListener('click',flipPlayer1)
player2FlipButton.addEventListener('click',flipPlayer2)

//Creating Boards for player1 and player 2 dynamically on run time
const width=10;
function createBoard(color, user){
   const gameBoardContainer=document.createElement('div');
   gameBoardContainer.classList.add('game-board');
   gameBoardContainer.style.backgroundColor=color;
   gameBoardContainer.id=user;
   for(i = 0; i < width * width; i++){
    const block=document.createElement('div')
    block.classList.add('block')
    block.id=i
    gameBoardContainer.append(block)
   }
   gamesBoardContainer.append(gameBoardContainer)

}
//calling method for creating game board with id user name and background colors parameters
createBoard('yellow','player1');
createBoard('pink','player2');
//this is ship class for storing name and lenght of each ship
class ShipPlayer1{
    constructor(name, length){
        this.name=name;
        this.length=length;
    }
}

// here created all 5 ships with thier name and lengths
const destroyer=new ShipPlayer1('destroyer',2);
const submrine=new ShipPlayer1('submrine',3);
const cruiser=new ShipPlayer1('cruiser',3);
const battleship=new ShipPlayer1('battleship',4);
const carrier=new ShipPlayer1('carrier',5);
// array of ships for player1
const shipsPlayer1=[destroyer,submrine,cruiser,battleship,carrier];
// array of ships for player2
const shipsPlayer2=[destroyer,submrine,cruiser,battleship,carrier];
// flag variable to check if ships dragged and droped sucessfully
let notDropped1
let notDropped2


// this is method where all logic is implemented for getting valid location block into game board 
// and returning blocks locations and ids for ship and flags for if taken or valid
function getHandleValidity(allBoardBlocks, isHorizontal, startIndex, ship){
    let validStart = isHorizontal ? startIndex <= width * width - ship.length ? startIndex : 
    width * width - ship.length : 
    startIndex <= width * width - width * ship.length ? startIndex :
    startIndex - ship.length * width + width
    let shipBlocks=[]
    for(let i=0;i<ship.length;i++){
        if(isHorizontal){
            shipBlocks.push(allBoardBlocks[Number(validStart) + i])
        }else{
            shipBlocks.push(allBoardBlocks[Number(validStart) + i * width])
        }
    }
    
    let valid
    if(isHorizontal){
        shipBlocks.every((_shipBlock,index) => valid = shipBlocks[0].id % width !== width -(shipBlocks.length - (index + 1)))

    }else{
        shipBlocks.every((_shipBlock,index) => valid = shipBlocks[0].id < 90 + (width * index + 1))

    }
    const  notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'))
    return {shipBlocks, valid, notTaken}
}
let autoStatus='manual'

// this is main method to call for adding a ship into game board where logic is implemented for 
// highlighting ships into game board and not highlighting if player1 into player2 and player2 ships into player1 are added

function addShipPiece(user, ship, startId){
    const allBoardBlocks=document.querySelectorAll(`#${user} div`)
    let randomBoolean= Math.random()<0.5
    let isHorizontal   //= user === 'player' ? anglePlayer1===0 :randomBoolean
    let randomStartIndex=Math.floor(Math.random() * width * width)
    let startIndex= startId ? startId : randomStartIndex
    if(user==='player1'){
        isHorizontal=anglePlayer1===0
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8080/addShipPlayer1", true); 
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
             // Response
             console.log('response')
             var response = this.responseText;
           }
        };
        console.log(startIndex)
        var data = {name:ship.name, length: ship.length, startindex: startIndex};
        xhttp.send(JSON.stringify(data));
    }else if(user=='player2'){
        isHorizontal=anglePlayer2===0
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8080/addShipPlayer2", true); 
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
             // Response
             console.log('response')
             var response = this.responseText;
           }
        };
        console.log(startIndex)
        var data = {name:ship.name, length: ship.length, startindex: startIndex};
        xhttp.send(JSON.stringify(data));
    }
    else{
        isHorizontal=randomBoolean
    }
   const {shipBlocks, valid, notTaken}= getHandleValidity(allBoardBlocks, isHorizontal, startIndex, ship)
    
   if(valid && notTaken){
        shipBlocks.forEach(shipBlock => {
            shipBlock.classList.add(ship.name)
            shipBlock.classList.add('taken')

            if(autoStatus === 'auto'){
                if(user=='player2'){
                shipBlock.style.backgroundColor='pink';
                }
                if(user=='player1'){
                    shipBlock.style.backgroundColor='yellow';
                    }
            }else if(autoStatus === 'manual'){
                shipBlock.classList.add('manual')
            }
            
        })
    }else{ 
       // if(user === 'player2') addShipPiece(user, ship, startId)
        if(user === 'player1') notDropped1=true
        if(user==='player2')  notDropped2=true
        
    }
}



//Drag Player ship
let draggedShip1
// getting all ships into array of player1
const optionShips = Array.from(player1OptionContainer.children)
// add listener for drag drop to all ships
optionShips.forEach(optionShip => optionShip.addEventListener('dragstart',dragstart))
// getting all 100 blocks from board player1 and adding listeners to listen on drop of ship
const allPlayerBlocks=document.querySelectorAll('#player1 div')
allPlayerBlocks.forEach(playerBlock => {
    playerBlock.addEventListener('dragover',dragOver)
    playerBlock.addEventListener('drop', dropShip)
})

let draggedShip2
let dragging1=false
let dragging2=false

// getting all ships into array of player1
const optionShips2 = Array.from(player2OptionContainer.children)

// add listener for drag drop to all ships
optionShips2.forEach(optionShip => optionShip.addEventListener('dragstart',dragstart2))

// getting all 100 blocks from board player2 and adding listeners to listen on drop of ship
const allPlayerBlocks2=document.querySelectorAll('#player2 div')
allPlayerBlocks2.forEach(playerBlock => {
    playerBlock.addEventListener('dragover',dragOver2)
    playerBlock.addEventListener('drop', dropShip2)
})

function dragstart(e){
    dragging1=true
    dragging2=false
    notDropped1=false
    draggedShip1 = e.target
    console.log(draggedShip1)
}
function dragOver(e){
   e.preventDefault()
   const ship= shipsPlayer1[draggedShip1.id]
   highlightArea1(e.target.id, ship)
}

// method for listening on droping ship and then calling addship function for adding into game board
function dropShip(e){
    if(!dragging2){
    const startId = e.target.id
    const ship=shipsPlayer1[draggedShip1.id]
    autoStatus='manual'
    addShipPiece('player1', ship,startId)
    if(!notDropped1){
        draggedShip1.remove()
    }
}
}

// for player 2
function dragstart2(e){
    dragging1=false
    dragging2=true
    notDropped2=false
    draggedShip2 = e.target
    console.log(draggedShip2)
}
// for player2
function dragOver2(e){
   e.preventDefault()
   const ship= shipsPlayer2[draggedShip2.id]
   highlightArea2(e.target.id, ship)
}

// for player2
function dropShip2(e){
    const startId = e.target.id
    const ship=shipsPlayer2[draggedShip2.id]
    autoStatus='manual'
    addShipPiece('player2', ship,startId)

    if(!notDropped2){
        draggedShip2.remove()
    }
}
function highlightArea1(startIndex, ship){
    const allBoardBlocks=document.querySelectorAll('#player1 div')
    let isHorizontal = anglePlayer1 === 0
    const {shipBlocks, valid, notTaken}= getHandleValidity(allBoardBlocks, isHorizontal, startIndex, ship)
   if(valid && notTaken){
    shipBlocks.forEach(shipBlock => {shipBlock.classList.add('hover')
    setTimeout(() => shipBlock.classList.remove('hover'),500 )
   }
    )
   }
}
function highlightArea2(startIndex, ship){
    const allBoardBlocks=document.querySelectorAll('#player2 div')
    let isHorizontal = anglePlayer1 === 0
    const {shipBlocks, valid, notTaken}= getHandleValidity(allBoardBlocks, isHorizontal, startIndex, ship)
   if(valid && notTaken){
    shipBlocks.forEach(shipBlock => {shipBlock.classList.add('hover')
    setTimeout(() => shipBlock.classList.remove('hover'),500 )
   }
    )
   }
}

//Game Code
let gameOver = false
let playerTurn='player2'


//start game function for player1 and getting ships from player2 page player2 board and adding
// into player1 page player2 board
function startGame(){
    var player2Ships
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/startPlayer1", true); 
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
     // Response
     player2Ships = this.textContent
     console.log(this.response)
     var player2ships=JSON.parse(this.response);
     console.log('response'+player2ships)
     for(let j=0;j<5;j++){
        console.log(player2ships[j].name)
        console.log(player2ships[j].length)
        console.log(player2ships[j].startindex)
        let newShip=new ShipPlayer1(player2ships[j].name,player2ships[j].length);
        autoStatus='auto'
        addShipPiece('player2', newShip, player2ships[j].startindex)
     }
     autoStatus='manual'
   }
};
xhttp.send()

    turnDisplay.textContent='player1'
    document.querySelector('#player2').classList.add('pieLabel')
    
    //player2OptionContainer.children.length != 0 || 
        if(player1OptionContainer.children.length != 0 ){
            infoDisplay.textContent='please place all your pieces first!'
        }else{
            const allBoardBlocksPlayer2=document.querySelectorAll('#player2 div')
            allBoardBlocksPlayer2.forEach(block=> block.addEventListener('click', handleClickPlayer2))

        }
        //player2OptionContainer.children.length != 0 || 
        if( player1OptionContainer.children.length != 0 ){
            infoDisplay.textContent='please place all your pieces first!'
        }else{
            const allBoardBlocksPlayer1=document.querySelectorAll('#player1 div')
            allBoardBlocksPlayer1.forEach(block=> block.addEventListener('click', handleClickPlayer1))

        }
    //playerTurn=sessionStorage.getItem("turn")

}
//start game function for player2 and getting ships from player2 page player1 board and adding
// into player1 page player1 board
function startGame2(){
    var player2Ships
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/startPlayer2", true); 
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
     // Response
     player2Ships = this.textContent
     console.log(this.response)
     var player2ships=JSON.parse(this.response);
     console.log('response'+player2ships)
     for(let j=0;j<5;j++){
        console.log(player2ships[j].name)
        console.log(player2ships[j].length)
        console.log(player2ships[j].startindex)
        let newShip=new ShipPlayer1(player2ships[j].name,player2ships[j].length);
        autoStatus='auto'
        addShipPiece('player1', newShip, player2ships[j].startindex)
     }
     autoStatus='manual'
   }
};
xhttp.send()

    turnDisplay.textContent='player1'
    document.querySelector('#player2').classList.add('pieLabel')
    
    //|| player1OptionContainer.children.length != 0
        if(player2OptionContainer.children.length != 0 ){
            infoDisplay.textContent='please place all your pieces first!'
        }else{
            const allBoardBlocksPlayer2=document.querySelectorAll('#player2 div')
            allBoardBlocksPlayer2.forEach(block=> block.addEventListener('click', handleClickPlayer2))

        }
        //|| player1OptionContainer.children.length != 0
        if(player2OptionContainer.children.length != 0){
            infoDisplay.textContent='please place all your pieces first!'
        }else{
            const allBoardBlocksPlayer1=document.querySelectorAll('#player1 div')
            allBoardBlocksPlayer1.forEach(block=> block.addEventListener('click', handleClickPlayer1))

        }
      //  playerTurn="player2"

}


// variables for statistics
let player1Hitts = []
let player2Hitts= []
let player1SunkShip = []
let player2SunkShip = []
let player1Missed=0
let player2Missed=0
let player1Hits=0
let player2Hits=0

// method for handling move of player1 on player2 board
function handleClickPlayer2(e){
   let turnResponse="none"
   turnResponse=getturn();
   console.log('response turn index1 '+turnResponse)
    if(gameOver!==true){
    check2()
    }
    let hit=0
    let miss=0
    let hitShip ='none'
    if(e.target.classList.contains('manual')){
        
    }else{
    console.log("handle click 2 1")
    //playerTurn=sessionStorage.getItem("turn")
    playerTurn=turnResponse
    console.log("handle click 2 2")
    //turnDisplay.textContent=playerTurn
    //turnDisplay.textContent=playerTurn
    if(playerTurn=='player1'){
        console.log('player1 clicked')
    if(!gameOver){
        if(e.target.classList.contains('taken')){
            hit=1
            miss=0
            e.target.classList.add('boom')
            infoDisplay.textContent=' You hit the player2 ship'
            let classes= Array.from(e.target.classList)
            classes= classes.filter(className => className != 'block')
            classes= classes.filter(className => className != 'taken')
            classes= classes.filter(className => className != 'boom') 
            classes= classes.filter(className => className != 'manual')
            player2Hitts.push(...classes)
            console.log(player2Hitts)
            hitShip=classes[0]
            
            player1Hits++
            player1HitsInfo.textContent= `${player1Hits}`
                turnDisplay.textContent='player2';
        }else{
            infoDisplay.textContent=' You Missed The Target'
            player1Missed++
            player1MissedInfo.textContent= `${player1Missed}`
            hit=0
            miss=1
            hitShip='none'
            turnDisplay.textContent='player1';
            playerTurn ='player2'
        }
    }
    
    }else{
        turnDisplay.textContent='This is Player2 Turn'
    }
    
}

 console.log("updatePlayer2")
 //Ajax call for interaction with Spring boot Application for updating player1 details
 if(gameOver!==true){
var xhttp = new XMLHttpRequest();
xhttp.open("POST", "http://localhost:8080/updatePlayer2", true); 
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
    console.log("updatePlayer2 result")
     // Response
     console.log('response')
     var response = this.responseText;
     check2()
   }
};
var data = {hits:hit,missed: miss, ship: hitShip};
xhttp.send(JSON.stringify(data));
}
if(hit == 0){
setTurn('player2')
console.log('Set Player1 now')
turnDisplay.textContent='player1'
}
playerTurn=getturn()
}
// method for handling move of player2 on player1 board
function handleClickPlayer1(e){
  console.log('this is one')
  let turnResponse='none'
  turnResponse=getturn()
  console.log('response turn index2'+turnResponse)
   
    if(gameOver!==true){
        check1()
    }
    let hit=0
    let miss=0
    let hitShip ='none'
    if(e.target.classList.contains('manual')){
        
    }else{
    console.log("handle click 1 1")
   // playerTurn=sessionStorage.getItem("turn")
      playerTurn=turnResponse
    console.log("handle click 1 2")
    if(playerTurn=='player2'){
        console.log('player1 clicked')
    if(!gameOver){
        if(e.target.classList.contains('taken')){
            hit=1
            miss=0 
            e.target.classList.add('boom')
                
            infoDisplay.textContent=' You hit the player1 ship'
            let classes= Array.from(e.target.classList)
            classes= classes.filter(className => className != 'block')
            classes= classes.filter(className => className != 'taken')
            classes= classes.filter(className => className != 'boom')
            classes= classes.filter(className => className != 'manual')
            player1Hitts.push(...classes)
            hitShip=classes[0]
            console.log(player1Hitts)
            player2Hits++
            player2HitsInfo.textContent= `${player2Hits}`
        
                turnDisplay.textContent='player1';
                playerTurn='player2'
        }else{
            infoDisplay.textContent=' You Missed The Target'
            player2Missed++
            player2MissedInfo.textContent= `${player2Missed}`
            hit=0
            miss=1
            hitShip='none'
            playerTurn='player1'
                turnDisplay.textContent='player2';
        }
    }
    //sessionStorage.setItem('turn','player1 ')
    //turnDisplay.textContent=playerTurn
}else{
    turnDisplay.textContent='This is Player1 Turn'
}
    }
    console.log("updatePlayer2")
//Ajax call for interaction with Spring boot Application for updating player2 details
if(gameOver!=true){
var xhttp = new XMLHttpRequest();
xhttp.open("POST", "http://localhost:8080/updatePlayer1", true); 
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
    console.log("updatePlayer2 result")
     // Response
     console.log('response')
     var response = this.responseText;
     check1()
   }
};
var data = {hits:hit,missed: miss, ship: hitShip};
xhttp.send(JSON.stringify(data));
if(hit==0){
    setTurn('player1')
    turnDisplay.textContent='player2'
    }

playerTurn=getturn()
}

}
//Method for checking result of player1
function check1(){
 //XML call for player 1 Result
 var xhttp = new XMLHttpRequest();
 xhttp.open("GET", "http://localhost:8080/getPlayer1Result", true); 
 xhttp.setRequestHeader("Content-Type", "application/json");
 xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Response
      var response = this.responseText;
      console.log(response)
      if(response === 'player1'||response === 'player2'){
        if(response === 'player2'){
            infoDisplay.textContent = `Your all ships have sunk ships YOU Lost`
            alert('Your all ships have sunk ships YOU Lost')
        
        }
        if(response === 'player1'){
            infoDisplay.textContent = `You have sunk all ${response} ships YOU WON`
            alert(`You have sunk all ${response} ships YOU WON`)
            }
        gameOver=true
     }
    }
 };
 xhttp.send();

}

//Method for checking result of player2
function check2(){
    //XML call for player 1 Result
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/getPlayer2Result", true); 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
         // Response
         var response = this.responseText;
         console.log(response)
         if(response === 'player1'||response === 'player2'){
            if(response === 'player2'){
            infoDisplay.textContent = `You have sunk all ${response} ships YOU WON`
            alert(`You have sunk all ${response} ships YOU WON`)
            }
            if(response === 'player1'){
                infoDisplay.textContent = `Your all ships have sunk ships YOU Lost`
                alert('Your all ships have sunk ships YOU Lost')
                }
            gameOver=true
         }
       }
    };
    xhttp.send();
   
   }
function checkScorePlayer1(user, userHits, userSunkShip){
    //XML call for player 1 Result
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/getPlayer1Result", true); 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
         // Response
         var response = this.responseText;
         console.log(response)
       }
    };
    xhttp.send();

    function checkShip(shipName, shipLength){
        if(userHits.filter(storedShip => storedShip === shipName).length === shipLength){
            infoDisplay.textContent= ` You sunk ${user}'s ${shipName}`
            player1Hitts=userHits.filter(storedShipName => storedShipName != shipName)
            userSunkShip.push(shipName)
        }
    }
    checkShip('destroyer',2)
    checkShip('submrine',3)
    checkShip('cruiser',3)
    checkShip('battleship',4)
    checkShip('carrier',5)
    console.log(player1Hitts)
    console.log(player1SunkShip)
    if(player1SunkShip.length === 5){
        infoDisplay.textContent = 'You have sunk all Player1 ships YOU WON'
        gameOver=true
    }
  

}
function checkScorePlayer2(user, userHits, userSunkShip){
   
    function checkShip(shipName, shipLength){
        if(userHits.filter(storedShip => storedShip === shipName).length === shipLength){
            infoDisplay.textContent= ` You sunk ${user}'s ${shipName}`
            player2Hitts=userHits.filter(storedShipName => storedShipName != shipName)
            userSunkShip.push(shipName)
        }
    }
    checkShip('destroyer',2)
    checkShip('submrine',3)
    checkShip('cruiser',3)
    checkShip('battleship',4)
    checkShip('carrier',5)
    console.log(player2Hitts)
    console.log(player2SunkShip)
    if(player2SunkShip.length == 5){
        infoDisplay.textContent = 'You have sunk all Player2 ships YOU WON'
        gameOver=true
    }

    
}
//Method for next turn
function setTurn(turnn){
  //  turnDisplay.textContent='wait...'
  console.log("set turn method")
    var xhttp = new XMLHttpRequest();
xhttp.open("POST", "http://localhost:8080/setTurn", false); 
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
    console.log("set turn method invoked")
     // Response
     
     var response = this.responseText;
     console.log(response)
    // turnDisplay.textContent=response
   }
};
var dat = {turn: turnn, num: 1}  
xhttp.send(JSON.stringify(dat))
}

//Method for getting turn
function getturn(){
   // turnDisplay.textContent='wait..'
    console.log('get turn method')
    var response
    var xhttp = new XMLHttpRequest(); 
xhttp.open("GET", "http://localhost:8080/getTurn", false); 
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
    console.log("updatePlayer2 result")
     // Response
     
     response = this.responseText;
     //turnDisplay.textContent=response
     console.log(response)
   }
};
xhttp.send()
 return response;
}

// setting listener for both player1 and player2 for starting game
startButton.addEventListener('click',startGame)
startButton2.addEventListener('click',startGame2)









