MyGame.screens['high-scores'] = (function(game) {
    'use strict';
    
    function initialize() {
        document.getElementById('id-high-scores-back').addEventListener(
            'click',
            function() { game.showScreen('menu-page'); });
    }
    
    function run() {
        let scores = localStorage.getItem('high-scores');
        
        if(scores === null || scores.length === 0){
            document.getElementById("no-scores").innerHTML = "No Current Scores"
        }
        else {
           let list = document.getElementById("scores-list");
           list.textContent = "";
           let arry = scores.split(",");
           let n = localStorage.getItem('names');
           let names = n.split(',');
            for(let i = 0; i< arry.length; i++){
                var node = document.createElement('li');
                node.appendChild(document.createTextNode(names[i] + ": " + arry[i]));
                list.appendChild(node);
            }

        }

    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
