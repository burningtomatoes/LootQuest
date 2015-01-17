var Sfx = {
    sounds: { },

    preload: function() {

    },

    load: function(fileName) {
        if (typeof Sfx.sounds[fileName] != 'undefined') {
            return Sfx.sounds[fileName];
        }

        Sfx.sounds[fileName] = new Audio('assets/sfx/' + fileName);
        Sfx.sounds[fileName].load();

        return Sfx.sounds[fileName];
    },

    play: function(soundId) {
        if (typeof Sfx.sounds[soundId] == 'undefined') {
            Sfx.load(soundId);
        } else {
            // Call load() every time to fix Chrome issue where sound only plays first time
            Sfx.sounds[soundId].load();
        }

        Sfx.sounds[soundId].play();
    }
};