let Player = {
    imageSrc: 'images/largePaddle.png',
    x: 300,
    y: 500,
    width: 100,
    height: 30,
    lives: 3,
    score: 0,

    moveLeft:
    function moveLeft() {
        if(Player.x > 0){
            Player.x -= 5;
        }
  },
    moveRight: function moveRight() {
        if(Player.x < (600 - Player.width)){
            Player.x += 5;
        }
  },
  initialize: function initialize() {
    Player.x = 300;
    Player.y = 500;
    Player.width = 100;
    Player.height = 30;
    Player.lives = 3;
    Player.score = 0;
  }
    
  }
  
  
  Player.image = new Image();
  Player.image.ready = false;
  Player.image.onload = function() {
    this.ready = true;
  };
  Player.image.src = Player.imageSrc;