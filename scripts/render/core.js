MyGame.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // --------------------------------------------------------------
    //
    // Draws a texture to the canvas with the following specification:
    //    image: Image
    //    center: {x: , y: }
    //    size: { width: , height: }
    //
    // --------------------------------------------------------------
    function drawTexture(image, center, rotation, size) {
        context.save();

        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.x / 2,
            center.y - size.y / 2,
            size.x, size.y);

        context.restore();
    }

    function drawSubTexture(image, index, subTextureWidth, centerX, centerY, sizeX, sizeY) {
        context.save();

        //
        // Pick the selected sprite from the sprite sheet to render
        context.drawImage(
            image,
            subTextureWidth * index, 0,      // Which sub-texture to pick out
            subTextureWidth, image.height,   // The size of the sub-texture
            centerX,           // Where to draw the sub-texture
            centerY,
            sizeX, sizeY);

        context.restore();
    }

    function drawText(spec) {
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fillStyle;
        context.strokeStyle = spec.strokeStyle;
        context.textBaseline = 'top';

        context.translate(spec.position.x, spec.position.y);
        context.rotate(spec.rotation);
        context.translate(-spec.position.x, -spec.position.y);


        context.fillText(spec.text, spec.position.x, spec.position.y);
        context.strokeText(spec.text, spec.position.x, spec.position.y);

        context.restore();
    }

    function drawBackground(texture) {
        if (texture.image.ready) {
                    context.save();
                    context.drawImage(
                        texture.image,
                        texture.center.x,
                        texture.center.y,
                        texture.width, texture.height);
                    context.restore();
        }
    };

    function drawGameOver(){
        context.lineWidth = 10;
        context.strokeRect(0,0, canvas.width,canvas.height);
        context.font = '80px Arial';
        context.fillStyle = "black";
        context.fillText('Game Over', 50, canvas.width / 4);
        context.font = '25px Arial';
        context.fillText('Press esc to play again', 75, canvas.width / 3);
    }

    function drawCountDown(number){
        context.lineWidth = 10;
        context.font = '50px Arial';
        switch(number){
            case 3: context.fillText("3", canvas.height / 2, 400);
            break;
            case 2: context.fillText("2", canvas.height / 2, 400);
            break;
            case 1: context.fillText("1", canvas.height / 2, 400);
            break;
            default:
                clear()
        }
        // context.fillText(number, 75, canvas.width / 3);
    }

    function drawBricks(bricks) {
        for(let i=0; i < bricks.length; i++){
            if (bricks[i].alive){
                switch(bricks[i].color){
                    case "yellow":
                        drawBrick(YellowBrick, bricks[i].x, bricks[i].level);
                        break;
                    case "orange":
                        drawBrick(OrangeBrick, bricks[i].x, bricks[i].level);
                        break;
                    case "blue":
                        drawBrick(BlueBrick, bricks[i].x, bricks[i].level);
                        break;
                    case "green":
                        drawBrick(GreenBrick, bricks[i].x, bricks[i].level);
                        break;                        
                }
            }
        }
    };

    function drawBrick(brick, x, y) {
          if (brick.image.ready) {
            context.save();
            context.drawImage(
                brick.image,
                x,
                y,
                brick.width, brick.height);
            context.restore();
            }
        
    }
    
    function drawPlayer(texture) {
        if (texture.image.ready) {
                    context.save();
                    context.drawImage(
                        texture.image,
                        texture.x ,
                        texture.y ,
                        texture.width, texture.height);
                    context.restore();
        }

    };

    function drawBall(texture) {
        if (texture.image.ready) {
                    context.save();
                    context.drawImage(
                        texture.image,
                        texture.center.x - texture.radius ,
                        texture.center.y - texture.radius ,
                        texture.width, texture.height);
                    context.restore();
        }
    };

    function drawLives(count, texture) {
        for(let i=0; i< count; i++){
            if (texture.image.ready) {
                context.save();
                context.drawImage(
                    texture.image,
                    5 + (i*30) ,
                     575,
                    25, 25);
                context.restore();
    }
        }
    }

    function drawScore(number){
        context.lineWidth = 10;
        context.font = '16px Arial';
        context.fillStyle = "yellow";
        context.fillText(`Score ${number}`, 500, 595);
    }
        

    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        drawText: drawText,
        drawBackground: drawBackground,
        drawGameOver: drawGameOver,
        drawCountDown: drawCountDown,
        drawBricks: drawBricks,
        drawBrick: drawBrick,
        drawPlayer: drawPlayer,
        drawLives: drawLives,
        drawScore: drawScore,
        drawBall: drawBall,
        drawSubTexture: drawSubTexture,
    };

    return api;
}());
