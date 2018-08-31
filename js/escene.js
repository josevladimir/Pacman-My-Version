////////////////////////////////////////////////////////////////////////////////////////////////

var escene = {
    matrix: [
        [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
        [8,9,9,9,9,9,9,9,9,9,9,9,9,9,8],
        [8,9,2,0,3,9,0,0,0,3,9,2,0,9,8],
        [8,9,4,0,5,9,9,9,9,1,9,1,9,9,8],
        [8,9,9,9,9,9,0,3,9,1,9,1,9,8,8],
        [8,9,1,9,9,9,9,1,9,9,9,9,9,9,8],
        [8,9,1,9,0,0,9,4,0,9,0,0,0,9,8],
        [8,9,1,9,9,9,9,9,9,9,9,9,9,9,8],
        [8,9,1,9,9,9,9,9,9,9,9,9,9,9,8],
        [9,9,9,9,9,1,7,7,7,1,9,9,9,9,9],
        [9,9,9,9,9,1,7,7,7,1,9,9,9,9,9],
        [8,9,9,9,9,4,0,0,0,5,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,9,9,2,3,9,8],
        [8,9,0,0,3,9,0,0,0,0,9,4,5,9,8],
        [8,9,9,9,1,9,9,9,9,9,9,9,9,9,8],
        [8,9,1,9,4,0,9,0,0,0,0,9,8,8,8],
        [8,9,1,9,9,9,9,9,9,9,9,9,9,9,8],
        [8,9,4,0,0,9,8,9,0,0,9,0,0,9,8],
        [8,9,9,9,9,9,8,9,9,9,9,9,9,9,8],
        [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8]
    ],
    width: 25,
    height: 25,
    constX: 0,
    constY: 0,
    muro: new Image(),
    pasillos: [
        new Image(),// 0: Horizontal
        new Image(),// 1: Vertical
        new Image(),// 2: Esquina Superior Izquierda
        new Image(),// 3: Esquina Superior Derecha
        new Image(),// 4: Esquina Inferior Izquierda
        new Image() // 5: Esquina Inferior Derecha

    ],
    getPosition: function(numX,numY){
        let pos = new Array(2);
        pos[0] = numX / 25;
        pos[1] = numY / 25;
        return pos;
    },
    draw: function(){
        this.matrix.forEach(fila => {
            fila.forEach(celda =>{
                if(celda == 0){
                    config.ctx.drawImage(escene.pasillos[0],this.constX,this.constY,this.width,this.height);
                }else if(celda == 1){
                    config.ctx.drawImage(escene.pasillos[1],this.constX,this.constY,this.width,this.height);
                }else if(celda == 2){
                    config.ctx.drawImage(escene.pasillos[2],this.constX,this.constY,this.width,this.height);
                }else if(celda == 3){
                    config.ctx.drawImage(escene.pasillos[3],this.constX,this.constY,this.width,this.height);
                }else if(celda == 4){
                    config.ctx.drawImage(escene.pasillos[4],this.constX,this.constY,this.width,this.height);
                }else if(celda == 5){
                    config.ctx.drawImage(escene.pasillos[5],this.constX,this.constY,this.width,this.height);
                }else if(celda == 8){
                    config.ctx.drawImage(escene.muro,this.constX,this.constY,this.width,this.height);
                }else if(celda == 9){
                    config.ctx.fillStyle = 'DarkBlue';
                    config.ctx.fillRect(this.constX,this.constY,this.width,this.height);
                    config.ctx.fillStyle = 'White';
                    config.ctx.beginPath();
                    config.ctx.arc(this.constX + 12.5,this.constY + 12.5,2.5,0,2*Math.PI,true);
                    config.ctx.fill();
                    config.ctx.closePath();
                }else if(celda == 7){
                    config.ctx.fillStyle = 'DarkBlue';
                    config.ctx.fillRect(this.constX,this.constY,this.width,this.height);
                }
                this.constX += 25;
            });
            this.constX = 0;
            this.constY += 25;
        });
        this.constY = 0;
    },
    clear: function(){
        config.ctx.clearRect(0,0,375,500);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////
