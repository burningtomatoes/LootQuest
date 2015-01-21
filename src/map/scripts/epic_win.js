window.mapScripts['epic_win'] = MapScript.extend({
    run: function () {
        Camera.trackingEntity = null;
        Camera.centerToMap();

        Dialogue.prepare([
            {text: 'You win the game! You found the treasure room!'},
            {text: 'Yeah, so, this is all I had time for.'},
            {text: 'Please forgive me.'},
            {text: 'You are the true hero!'}
        ], function() {
            Camera.trackingEntity = Game.map.player;
        });

        Dialogue.show();
    }
});