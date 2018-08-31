var config = {
    canvas: null,
    ctx: null,
    fps: 8,
    imagenes: [
        'muro','Hori','Vert','Esquina-S-I','Esquina-S-D','Esquina-I-I','Esquina-I-D',
        'Pacman','Pacman-o','PacmanU','PacmanU-o','PacmanD','PacmanD-o','PacmanL','PacmanL-o',
        'cuco'
    ],
    lifes: 3,
    score: 0,
    time: {
        seconds: 0,
        minutes: 0,
    },
    timing: null,
    gameloop: null,
    maxScore: 805,
    status: 'active'
}

function updateScore(){
    document.getElementById('score-box').innerHTML = config.score;
}

function timing(){
    config.timing = setInterval(function(){
        let time = '00:00';
        config.time.seconds += 1;
        if(config.time.seconds == 60){
            config.time.seconds = 0;
            config.time.minutes += 1;
        }
        if(config.time.seconds < 10) time = `0${config.time.minutes}:0${config.time.seconds}`;
        else time = `0${config.time.minutes}:${config.time.seconds}`;
        document.getElementById('time-box').innerHTML = time;
    },1000);
}

function checkStatusGame(){
    if(!pacman.alive){
        if(config.lifes == 1){
            updateLifes(config.lifes -= 1);
            clearInterval(config.gameloop);
            clearInterval(config.timing);
            return endDisplay('HAS PERDIDO!');
        }
        config.status = '';
        setTimeout(function(){
            config.status = 'active';
        },5000);
        resetGame();
        return updateLifes(config.lifes -= 1);
    }
    if(config.score == 805){
        clearInterval(config.gameloop);
        clearInterval(config.timing);
        return endDisplay('GANASTE!')
    }
}

function resetGame(){
    clearInterval(config.gameloop);
    clearInterval(config.timing);
    pacman.alive = true;
    pacman.mPosition[0] = 7;
    pacman.mPosition[1] = 10;
    timing();
    gameLoop();
}

function endDisplay(message){
    $('#end-label').text(message);
    $('#display').animate({opacity: 1},500);
}

function updateLifes(lifes){
    config.lifes = lifes;
    return $('#life-box').text(lifes);
}