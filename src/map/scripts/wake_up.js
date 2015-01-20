window.mapScripts['wake_up'] = MapScript.extend({
    run: function() {
        var chest = new Chest();
        chest.setCoord(9, 7);
        chest.direction = Direction.DOWN;
        this.map.add(chest);

        if (!Settings.skipIntroDialogue) {
            Dialogue.prepare([
                { text: 'What..what is this?', player: true },
                { text: 'Where am I?', player: true }
            ]);
            Dialogue.show();
        }
    }
});