var Sfx = {
    sounds: { },

    preload: function() {
        // Note to self: Do not preload "burning tomato". It doesn't work due to timing issues and just causes overhead.
        this.load('dialogue_tick.wav');
        this.load('player_hurt.wav');
        this.load('enemy_hurt.wav');
        this.load('cinboom.wav');
        this.load('sword_attack.wav');
        this.load('damage_chest.wav');
        this.load('goblin_death.wav');
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