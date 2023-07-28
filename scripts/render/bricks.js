let BlueBrick = {
    imageSrc: 'images/blue.png',
    width: 38,
    height: 20,
  };
  
  BlueBrick.image = new Image();
  BlueBrick.image.ready = false;
  BlueBrick.image.onload = function() {
    this.ready = true;
  };
  BlueBrick.image.src = BlueBrick.imageSrc;

  let YellowBrick = {
    imageSrc: 'images/yellow.png',
    width: 38,
    height: 20,
  };
  
  YellowBrick.image = new Image();
  YellowBrick.image.ready = false;
  YellowBrick.image.onload = function() {
    this.ready = true;
  };
  YellowBrick.image.src = YellowBrick.imageSrc;

  let OrangeBrick = {
    imageSrc: 'images/orange.png',
    width: 38,
    height: 20,
  };
  
  OrangeBrick.image = new Image();
  OrangeBrick.image.ready = false;
  OrangeBrick.image.onload = function() {
    this.ready = true;
  };
  OrangeBrick.image.src = OrangeBrick.imageSrc;

  let GreenBrick = {
    imageSrc: 'images/green.png',
    width: 38,
    height: 20,
  };
  
  GreenBrick.image = new Image();
  GreenBrick.image.ready = false;
  GreenBrick.image.onload = function() {
    this.ready = true;
  };
  GreenBrick.image.src = GreenBrick.imageSrc;

  function aliveCount(bricks) {
    let count = 0
    for(let i=0; i < bricks.length; i++){

        if (bricks[i].alive){
            count++;
        }
    }
    return count;
  }

  let yellow1 = false;
  let yellow2 = false;
  let orange1 = false;
  let orange2 = false;
  let blue1 = false;
  let blue2 = false;
  let green1 = false;
  let green2 = false;
  let shrink = false;

  function CompletedRow(bricks){
    let yellow1Count = 0;
    let yellow2Count = 0;
    let orange1Count = 0;
    let orange2Count = 0;
    let blue1Count = 0;
    let blue2Count = 0;
    let green1Count = 0;
    let green2Count = 0;
    for(let i=0; i < bricks.length; i++){
        if(i >= 0 && i < 15){
            if(bricks[i].alive){
                yellow1Count += 1;
            }
        }
        else if (i >= 15 && i < 30){
            if(bricks[i].alive){
                yellow2Count += 1;

            }
        }
        else if (i >= 30 && i < 45){
             if(bricks[i].alive){
                orange1Count += 1;

             }
        }
        else if (i >= 45 && i < 60){
             if(bricks[i].alive){
                orange2Count += 1;

             }
        }
        else if (i >= 60 && i < 75){
             if(bricks[i].alive){
                blue1Count += 1;

             }
        }
        else if (i >= 75 && i < 90){
             if(bricks[i].alive){
                blue2Count += 1;

             }
        }
        else if (i >= 90 && i < 105){
             if(bricks[i].alive){
                green1Count += 1;

             }
        }
        else if (i >= 105 && i < 120){
             if(bricks[i].alive){
                green2Count += 1;
             }
        }
        }
        if(yellow1Count === 0 && !yellow1){
            Player.score += 25;
            yellow1 = true;
        }
        if(yellow2Count === 0 && !yellow2){
            Player.score += 25;
            yellow2 = true;
        }
        if(orange1Count === 0 && !orange1){
            Player.score += 25;
            orange1 = true;
        }
        if(orange2Count === 0 && !orange2){
            Player.score += 25;
            orange2 = true;
        }
        if(blue1Count === 0 && !blue1){
            Player.score += 25;
            blue1 = true;
        }
        if(blue2Count === 0 && !blue2){
            Player.score += 25;
            blue2 = true;
        }
        if(green2Count < 15 && !shrink){
            console.log(green2Count);
            shrink = true;
            Player.imageSrc = 'images/smallPaddle.png'
            Player.image = new Image();
            Player.image.ready = false;
            Player.image.onload = function() {
              this.ready = true;
            };
            Player.image.src = Player.imageSrc;
            Player.width = Player.width / 2;
        }
        if(green1Count === 0 && !green1){
            Player.score += 25;
            green1 = true;
        }
        if(green2Count === 0 && !green2){
            Player.score += 25;
            green2 = true;
        }

    }
