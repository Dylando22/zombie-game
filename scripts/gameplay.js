MyGame.screens['game-page'] = (function(game, input, graphics, renderer) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let CountDown = 3;
    let CountDownClock = 0;
    let bricks =  [];
    let myKeyboard = input.Keyboard();
    let GameOverState = false;
    let newBallCount = 100;

    let background = {
        imageSrc: 'images/background2.jpg',
        center: { x: 0, y: 0 },
        width: 600,
        height: 600,
      };
      
      background.image = new Image();
      background.image.ready = false;
      background.image.onload = function() {
        this.ready = true;
      };
      background.image.src = background.imageSrc;
      

      let PlayerAnimationRenderer = renderer.AnimatedModel({
        spriteSheet: 'images/syringesheet.png',
        spriteCount: 6,
        spriteTime: [150, 150, 150, 150, 150, 250],   // ms per frame
    }, graphics);


    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        if(CountDown > 0){
            CountDownClock += elapsedTime;
            if (CountDownClock > 1000){
                CountDownClock -= 1000;
                CountDown -= 1;
            }
        }
        else {
            if(!GameOverState){
                Ball.update(elapsedTime, bricks);
                if(newBall.active){
                    newBall.update(elapsedTime,bricks);
                }
                if(!Ball.active){
                    Player.lives -= 1;
                    if(Player.lives == 0){
                        GameOverState = true;
                        setHighScores();
                    }
                    else {
                        Ball.initialize();
                        CountDown = 3;
                        CountDownClock = 0;
                    }
                }
                else{
                    if( Player.score > newBallCount && !newBall.active && !isNewBall){
                        newBall.initialize();
                        CountDown = 3;
                        CountDownClock = 0;
                        isNewBall = true;
                        newBallCount += 100;
                    }
                }
            }
            else{
                PlayerAnimationRenderer.update(elapsedTime);
            }
        }
        
    }

    function render() {
        graphics.drawBackground(background);
        if(CountDown > 0){
            graphics.drawCountDown(CountDown);
        }
        graphics.drawBricks(bricks);
        graphics.drawBall(Ball);
        if(newBall.active){
            graphics.drawBall(newBall);
        }
        graphics.drawLives(Player.lives,Ball)
        graphics.drawScore(Player.score)
        if(GameOverState){
            graphics.drawGameOver();
            PlayerAnimationRenderer.render(Player);
        }
        else{
            graphics.drawPlayer(Player);
        }
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;
        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        CountDown = 3;
        CountDownClock = 0;
        GameOverState = false;
        bricks =  [];
        Player.initialize();
        Ball.initialize();
        let colors = ['yellow','orange','blue', 'green']
        let level = 250;
        for(let i=0; i<colors.length; i++){
            for(let k = 0; k < 2; k++ ){
                for(let j=0; j < 15; j++){
                    bricks.push({
                        alive: true,
                        color: colors[i],
                        level: level - (k*22), 
                        x: j * 40,
                        width: 40,
                    });
                }
            }
            level -= 44;
        }
    

        myKeyboard.register('Escape', function() {
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            //
            // Then, return to the main menu
            if(GameOverState){
                game.showScreen('menu-page');
                pauseSound('zombie');
            }
            else{
                game.showScreen('pop-up-page');
                pauseSound('zombie');
            }


        });
        myKeyboard.register('ArrowLeft', Player.moveLeft)
        myKeyboard.register('ArrowRight', Player.moveRight)
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.input, MyGame.graphics, MyGame.render));


function setHighScores() {
    let scores = localStorage.getItem('high-scores');
    if(scores === null || scores.length === 0){
        let player = prompt(`New Highscore of ${Player.score}, enter 3 digit name`);
        localStorage.setItem('high-scores', Player.score );
        localStorage.setItem('names',player);
    }
    else{
        let oldNames = localStorage.getItem('names');
        let names = oldNames.split(',');
        let oldScores = scores.split(',');
        let scorestr= ""
        let nameStr= "";
        let scoreEntered = false;
        for(let i =0; i < oldScores.length; i++){
            if(Player.score > oldScores[i] && !scoreEntered){

                scoreEntered = true;
                if( i === 0) {
                    scorestr += Player.score + "," + oldScores[i];
                    nameStr += player + "," + names[i];
                }
                else{
                    scorestr += "," + Player.score + "," + oldScores[i];
                    nameStr += "," + player + "," + names[i];
                }
            }
            else {
                if(i > 0){
                    scorestr += "," + oldScores[i];
                    nameStr += "," + names[i];
                }
                else{
                    scorestr += oldScores[i];
                    nameStr += names[i];
                }
            }
        }
        console.log(scorestr);
        console.log(nameStr);
        localStorage.setItem('high-scores', scorestr);
        localStorage.setItem('names', nameStr);

    }
}