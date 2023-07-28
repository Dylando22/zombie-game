//------------------------------------------------------------------
//
// This function performs the one-time game initialization.
//
//------------------------------------------------------------------
function initializeAudio() {
    'use strict';

    function loadSound(source) {
        let sound = new Audio();
        sound.addEventListener('canplay', function() {
            console.log(`${source} is ready to play`);
        });
        sound.addEventListener('play', function() {
            console.log(`${source} started playing`);
        });
        sound.addEventListener('pause', function() {
            console.log(`${source} paused`);
        });
        sound.addEventListener('canplaythrough', function() {
            console.log(`${source} can play through`);
        });
        sound.addEventListener('progress', function() {
            console.log(`${source} progress in loading`);
        });
        sound.addEventListener('timeupdate', function() {
            // console.log(`${source} time update: ${this.currentTime}`);
        });
        sound.src = source;
        sound.volume = .5;
        if(source = 'audio/Siren.mp3'){
            sound.volume = .1;
        }
        return sound;
    }

    function loadAudio() {
        MyGame.sounds = {}
        MyGame.sounds['zombie'] = loadSound('audio/Zombie.mp3');
        MyGame.sounds['siren'] = loadSound('audio/Siren.mp3');

    }


    loadAudio();
}

//------------------------------------------------------------------
//
// Pauses the specified audio
//
//------------------------------------------------------------------
function pauseSound(whichSound) {
    MyGame.sounds[whichSound].pause();

}

//------------------------------------------------------------------
//
// Plays the specified audio
//
//------------------------------------------------------------------
function playSound(whichSound) {
    MyGame.sounds[whichSound].play();
}

