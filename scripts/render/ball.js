let SpeedFactor = 1;

let Ball = {
    imageSrc: 'images/ball.png',
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
    active: true,
    update: function update(elapsedTime , bricks){
        Ball.center.x += (elapsedTime * Ball.speed * Ball.direction.x * SpeedFactor);
        Ball.center.y += (elapsedTime * Ball.speed * Ball.direction.y * SpeedFactor);
        if(Ball.center.x + Ball.radius >= 600){
            Ball.direction.x *= -1;
        }
        if(Ball.center.x - Ball.radius <= 0){
            Ball.direction.x *= -1;
        }
        if(Ball.center.y - Ball.radius <= 0){
            Ball.direction.y *= -1;
        }
        if(Ball.center.y + Ball.radius >= 600){
            Ball.speed = 0;
            Ball.active = false;

        }
        if(Ball.center.y + Ball.radius >= Player.y && 
            Ball.center.x + Ball.radius >= Player.x && 
            Ball.center.x - Ball.radius < Player.x + Player.width){
            Ball.direction.y *= -1;
            let PlayerCenter = (Player.x + (Player.width /2));
            Ball.direction.x = (Ball.center.x - PlayerCenter) / (Player.width / 2);
        }
        let collision = false;
        for(let i=0; i < bricks.length; i++){
            if (bricks[i].alive){
                if (!collision &&
                    Ball.center.y - Ball.radius <= bricks[i].level + 20 && 
                Ball.center.x + Ball.radius >= bricks[i].x && 
                Ball.center.x - Ball.radius <= bricks[i].x + bricks[i].width){
                    Ball.direction.y *= -1;
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
                        SpeedFactor += .5;
                    }
                    CompletedRow(bricks);
                }
                
            }
        }
    },
    initialize: function initialize() {
        Ball.center = {
            x: 300,
            y: 480
        };
        Ball.width = 30;
        Ball.height = 30;
        Ball.radius = 15;
        Ball.speed = .15;
        Ball.direction = {
            x: 0.5,
            y: -0.5,
        };
        Ball.active = true;
    }

  }

  
  
  Ball.image = new Image();
  Ball.image.ready = false;
  Ball.image.onload = function() {
    this.ready = true;
  };
  Ball.image.src = Ball.imageSrc;