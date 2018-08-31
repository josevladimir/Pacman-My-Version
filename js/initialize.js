var pacmanImg = {
    Right: new Image(),
    RightO: new Image(),
    Up: new Image(),
    UpO: new Image(),
    Down: new Image(),
    DownO: new Image(),
    Left: new Image(),
    LeftO: new Image(),
}
var ghostImg = new Image();
///////LOADING IMAGES/////////////////
    escene.muro.src = `Assets/${config.imagenes[0]}.svg`;
    escene.pasillos[0].src = `Assets/${config.imagenes[1]}.svg`;
    escene.pasillos[1].src = `Assets/${config.imagenes[2]}.svg`;
    escene.pasillos[2].src = `Assets/${config.imagenes[3]}.svg`;
    escene.pasillos[3].src = `Assets/${config.imagenes[4]}.svg`;
    escene.pasillos[4].src = `Assets/${config.imagenes[5]}.svg`;
    escene.pasillos[5].src = `Assets/${config.imagenes[6]}.svg`;
    pacmanImg.Right.src = `Assets/${config.imagenes[7]}.svg`;
    pacmanImg.RightO.src = `Assets/${config.imagenes[8]}.svg`;
    pacmanImg.Up.src = `Assets/${config.imagenes[9]}.svg`;
    pacmanImg.UpO.src = `Assets/${config.imagenes[10]}.svg`;
    pacmanImg.Down.src = `Assets/${config.imagenes[11]}.svg`;
    pacmanImg.DownO.src = `Assets/${config.imagenes[12]}.svg`;
    pacmanImg.Left.src = `Assets/${config.imagenes[13]}.svg`;
    pacmanImg.LeftO.src = `Assets/${config.imagenes[14]}.svg`;
    ghostImg.src = `Assets/${config.imagenes[15]}.svg`;
//////////////////////////////////////

function keyboardConfig(ev){
    if(ev.key == 'ArrowRight') return pacman.direction = 'Right';
    if(ev.key == 'ArrowLeft') return pacman.direction = 'Left';
    if(ev.key == 'ArrowUp') return pacman.direction = 'Up';
    return pacman.direction = 'Down';
}

/////////////CREATING PACMAN/////////
const pacman = new Pacman([7,10],pacmanImg);
/////////////////////////////////////

////////////CREATING GHOSTS//////////
var ghosts = [
    new Ghost([1,1],ghostImg,'Right'),
    new Ghost([1,18],ghostImg,'Up'),
    new Ghost([13,1],ghostImg,'Down'),
    new Ghost([13,18],ghostImg,'Left'),
];

function ghostLoop(){
    ghosts.forEach(ghost => {
        ghost.draw();
        ghost.eat();
        ghost.move();
    })
}

function ghostLoopNoMove(){
    ghosts.forEach(ghost => {
        ghost.draw();
    })
}
/////////////////////////////////////

function gameLoop(){
    return config.gameloop = setInterval(
        function(){
            escene.clear();
            escene.draw();
            if(config.status == 'active'){
                pacman.move();
                pacman.eat();
                pacman.draw();
                ghostLoop();
            }else{
                pacman.draw();
                ghostLoopNoMove();
            }
            checkStatusGame();
        }, 1000/config.fps
    );
}