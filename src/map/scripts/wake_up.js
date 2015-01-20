window.mapScripts['wake_up'] = MapScript.extend({
    run: function() {
        if (!Settings.skipIntroDialogue) {
            Dialogue.prepare([
                { text: 'What..what is this?', player: true },
                { text: 'Where am I?', player: true }
            ]);
            Dialogue.show();
        }
    }
});