window.mapScripts['troll_intro_room'] = MapScript.extend({
    evilTroll: null,

    run: function() {
        Music.stopAll();

        this.evilTroll = new Goblin();
        this.evilTroll.direction = Direction.UP;
        this.evilTroll.setCoord(9, 7);
        this.map.add(this.evilTroll);

        Camera.followEntity(this.evilTroll);

        Dialogue.prepare([
            { text: 'Who dares enter my lair!?', evil: true },
            { text: 'Begone with you!', evil: true }
        ], this.afterIntro.bind(this));
        Dialogue.show();
    },

    afterIntro: function() {
        Camera.followEntity(this.map.player);
        Music.loopSound('dungeon_ambience.mp3');
    }
});