window.onload = function(){
    config.canvas = document.querySelector('#canvas');
    config.ctx = config.canvas.getContext('2d');
    document.addEventListener('keydown',keyboardConfig);
    timing();
    gameLoop();
}

