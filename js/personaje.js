class Personaje {
    constructor(mPosition,img) {
        this.cPosition = [
            mPosition[0] * 25,
            mPosition[1] * 25,
        ];
        this.mPosition = mPosition;
        this.height = 25;
        this.width = 25;
        this.direction;
        this.Img = img;
    }
    
    setPosition(){
        return {
            canvasPosition: this.cPosition,
            matrixPosition: this.mPosition
        }
    }

    fromMtoCPosition(){
        this.cPosition[0] = this.mPosition[0] * 25;
        this.cPosition[1] = this.mPosition[1] * 25;
    }

    draw(){
        //Implement in especific personaje class
    }

    move(){
        let x = this.mPosition[0];
        let y = this.mPosition[1];
        switch(this.direction){
            case 'Left':
                if(x == 0 && (y == 9 || y == 10)){
                    this.mPosition[0] = 14;
                    
                }else{
                    x -= 1;
                    if(escene.matrix[y][x] == 9 ||
                       escene.matrix[y][x] == 7){
                        this.mPosition[0] -= 1;
                    }
                }
                break;
            case 'Right':
                if(x == 14 && (y == 9 || y == 10)){
                    this.mPosition[0] = 0;
                }else{
                    x += 1;
                    if(escene.matrix[y][x] == 9 ||
                       escene.matrix[y][x] == 7){
                        this.mPosition[0] += 1;
                    }
                }
                break;
            case 'Up':
                y -= 1;
                if(escene.matrix[y][x] == 9 ||
                   escene.matrix[y][x] == 7){
                    this.mPosition[1] -= 1;
                   }
                break;
            case 'Down':
                y += 1;
                if(escene.matrix[y][x] == 9 ||
                   escene.matrix[y][x] == 7){
                    this.mPosition[1] += 1;
                }
                break;
            default:
                break;
        }
        this.fromMtoCPosition();
    }
}

class Pacman extends Personaje{
    constructor(mPosition,Img){
        super(mPosition,Img);
        this.state = 0; // 0: Close 1:, Open
        this.direction = 'Right';
        this.alive = true;
    }

    eat(){
        let x = this.mPosition[0];
        let y = this.mPosition[1];
        if(escene.matrix[y][x] == 9){
            config.score += 5;
            updateScore();
            escene.matrix[y][x] = 7;
        }
    }

    draw(){
        let x = this.cPosition[0];
        let y = this.cPosition[1];
        if(this.state == 0){
            config.ctx.drawImage(this.Img[this.direction],x,y,this.width,this.height);
        }else{
            config.ctx.drawImage(this.Img[`${this.direction}O`],x,y,this.width,this.height);
        }
        this.state = !this.state;
    }
}

class Ghost extends Personaje{
    constructor(mPosition,Img,direction){
        super(mPosition,Img);
        this.direction = direction;
    }

    draw(){
        config.ctx.drawImage(this.Img,this.cPosition[0],this.cPosition[1],this.width,this.height);
    }

    eat(){
        if(this.mPosition[0] == pacman.mPosition[0] &&
           this.mPosition[1] == pacman.mPosition[1]){
            pacman.alive = false;
        }
    }

    move(){
        let x = this.mPosition[0]; let y = this.mPosition[1];
        switch (this.direction) {
            case 'Right':
                this.moveR(x,y);
                break;
            case 'Left':
                this.moveL(x,y);
                break;
            case 'Up':
                this.moveU(x,y);
                break;
            case 'Down':
                this.moveD(x,y);
                break;
            default:
                break;
        }
    }

    moveR(x,y){
        if(escene.matrix[y][x+1] == 7 ||
           escene.matrix[y][x+1] == 9){
            this.mPosition[0] += 1;
            return this.fromMtoCPosition();
        }
        return this.randomDirection(x,y);
    }

    moveD(x,y){
        if(escene.matrix[y+1][x] == 7 ||
           escene.matrix[y+1][x] == 9){
            this.mPosition[1] += 1;
            return this.fromMtoCPosition();
        }
        return this.randomDirection(x,y);
    }
    
    moveU(x,y){
        if(escene.matrix[y-1][x] == 7 ||
           escene.matrix[y-1][x] == 9){
            this.mPosition[1] -= 1;
            return this.fromMtoCPosition();
        }
        return this.randomDirection(x,y);
    }

    moveL(x,y){
        if(escene.matrix[y][x-1] == 7 ||
           escene.matrix[y][x-1] == 9){
            this.mPosition[0] -= 1;
            return this.fromMtoCPosition();
        }
        return this.randomDirection(x,y);
    }

    randomDirection(x,y){
        let direction = Math.round(Math.random() * 3);
        console.log(direction);
        if(direction == 0){
            this.direction = 'Left';
            return this.moveL(x,y);
        }else if(direction == 1){
            this.direction = 'Up';
            return this.moveU(x,y);
        }else if(direction == 2){
            this.direction = 'Down';
            return this.moveD(x,y);
        }else{
            this.direction = 'Right';
            return this.moveR(x,y);
        }
    }
}