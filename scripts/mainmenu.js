MyGame.screens['menu-page'] = (function(game) {
    'use strict';
    
    function initialize() {
        //
        // Setup each of menu events for the screens
        document.getElementById('id-new-game').addEventListener(
            'click',
            function() {
                game.showScreen('game-page');
                MyGame.screens['game-page'].initialize();
                pauseSound('siren');
                playSound('zombie');

                
        });
        
        document.getElementById('id-high-scores').addEventListener(
            'click',
            function() { game.showScreen('high-scores'); });
        
        document.getElementById('id-credits').addEventListener(
            'click',
            function() { game.showScreen('credit-page'); });
    }
    
    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
