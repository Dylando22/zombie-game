MyGame.screens['credit-page'] = (function(game) {
    'use strict';
    
    function initialize() {
        document.getElementById('id-credits-back').addEventListener(
            'click',
            function() { game.showScreen('menu-page'); });
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
