let NewSpeedFactor = 1;
let isNewBall = false;

let newBall = {
    imageSrc: 'images/newBall.png',
    center: {
        x: 300,
        y: 480
    },
    width: 30,
    height: 30,
    radius: 15,
    speed: .15,
    direction: {
        x: 0.5,
        y: -0.5,
    },
    active: false,
    update: function update(elapsedTime , bricks){
        if(newBall.active){

            newBall.center.x += (elapsedTime * newBall.speed * newBall.direction.x * NewSpeedFactor);
            newBall.center.y += (elapsedTime * newBall.speed * newBall.direction.y * NewSpeedFactor);
            if(newBall.center.x + newBall.radius >= 600){
                newBall.direction.x *= -1;
            }
            if(newBall.center.x - newBall.radius <= 0){
                newBall.direction.x *= -1;
            }
            if(newBall.center.y - newBall.radius <= 0){
                newBall.direction.y *= -1;
            }
            if(newBall.center.y + newBall.radius >= 600){
                newBall.speed = 0;
                newBall.active = false;
                isNewBall = false;
    
            }
            if(newBall.center.y + newBall.radius >= Player.y && 
                newBall.center.x + newBall.radius >= Player.x && 
                newBall.center.x - newBall.radius < Player.x + Player.width){
                newBall.direction.y *= -1;
                let PlayerCenter = (Player.x + (Player.width /2));
                console.log((newBall.center.x - PlayerCenter) / PlayerCenter)
                newBall.direction.x = (newBall.center.x - PlayerCenter) / (Player.width / 2);
            }
            let collision = false;
            for(let i=0; i < bricks.length; i++){
                if (bricks[i].alive){
                    if (!collision &&
                        newBall.center.y - newBall.radius <= bricks[i].level + 20 && 
                    newBall.center.x + newBall.radius >= bricks[i].x && 
                    newBall.center.x - newBall.radius <= bricks[i].x + bricks[i].width){
                        newBall.direction.y *= -1;
                        bricks[i].alive = false;
                        switch(bricks[i].color){
                        case "yellow":
                            Player.score += 1;
                            break;
                        case "orange":
                            Player.score += 2;
                            break;
                        case "blue":
                            Player.score += 3;
                            break;                        
                        case "green":      
                            Player.score += 5;
                            break;                        
                                        }
                        collision = true;
                        alive = aliveCount(bricks);
                        if(alive === 116 || alive === 108 || alive === 84 || alive === 58 ){
                            NewSpeedFactor += .5;
                        }
                        CompletedRow(bricks);
                    }
                    
                }
            }
        }
    },
    initialize: function initialize() {
        newBall.center = {
            x: 300,
            y: 480
        };
        newBall.width = 30;
        newBall.height = 30;
        newBall.radius = 15;
        newBall.speed = .15;
        newBall.direction = {
            x: 0.5,
            y: -0.5,
        };
        newBall.active = true;
    }

  }

  
  
  newBall.image = new Image();
  newBall.image.ready = false;
  newBall.image.onload = function() {
    this.ready = true;
  };
  newBall.image.src = newBall.imageSrc;